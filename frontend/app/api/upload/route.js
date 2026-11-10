import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// Kita pakai Service Role Key di server-side agar bisa bypass RLS saat upload file
// (Pastikan kamu sudah menambahkan SUPABASE_SERVICE_ROLE_KEY di .env.local)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

export async function POST(request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file')
    const userId = formData.get('userId')

    if (!file || !userId) {
      return NextResponse.json({ error: 'File dan UserId wajib ada' }, { status: 400 })
    }

    // 1. Upload file ke Supabase Storage (Bucket: photos)
    const fileExt = file.name.split('.').pop()
    const fileName = `${userId}/${Date.now()}.${fileExt}`
    
    const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
      .from('photos')
      .upload(fileName, file, { contentType: file.type })

    if (uploadError) throw uploadError

    // 2. Simpan metadata ke tabel photos
    const { data: dbData, error: dbError } = await supabaseAdmin
      .from('photos')
      .insert([
        { user_id: userId, storage_path: fileName }
      ])
      .select()

    if (dbError) throw dbError

    return NextResponse.json({ success: true, photo: dbData[0] })
    
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}