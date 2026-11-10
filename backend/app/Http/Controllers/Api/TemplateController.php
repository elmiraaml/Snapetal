<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Template;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TemplateController extends Controller
{
    /**
     * 1. Fungsi untuk Creator Upload Template
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            // Validasi diubah agar bisa menerima jpg, jpeg, dan webp
            'image' => 'required|image|mimes:png,jpg,jpeg,webp|max:5120', 
            'config' => 'required|json',
            'category' => 'nullable|string|max:255', 
        ]);

        // PERBAIKAN: Simpan langsung ke root bucket (tanpa folder 'templates')
        $path = $request->file('image')->store('/', 'supabase');
        
        $template = Template::create([
            'creator_id' => $request->user()->id,
            'name' => $request->name,
            'category' => $request->category ?? 'Classic Strips', 
            // PERBAIKAN: Gabungkan URL dengan path file (hanya 1 kali 'templates')
            'image_url' => env('SUPABASE_URL') . '/' . $path, 
            'config' => $request->config,
            'status' => 'pending',
        ]);

        return response()->json([
            'message' => 'Template berhasil diupload, menunggu verifikasi admin.',
            'data' => $template
        ], 201);
    }

    /**
     * 2. Fungsi untuk Admin melihat template yang pending
     */
    public function pendingTemplates()
    {
        $templates = Template::where('status', 'pending')->with('creator')->get();
        
        return response()->json([
            'message' => 'List template pending',
            'data' => $templates
        ]);
    }

    /**
     * 3. Fungsi untuk Admin menyetujui template
     */
    public function approve($id)
    {
        $template = Template::findOrFail($id);
        $template->update(['status' => 'approved']);

        return response()->json([
            'message' => 'Template berhasil disetujui.',
            'data' => $template
        ]);
    }

    /**
     * 4. Fungsi untuk User melihat template yang sudah approved (bisa difilter kategori)
     */
    public function index(Request $request)
    {
        $query = Template::where('status', 'approved');

        if ($request->has('category') && $request->category !== 'All') {
            $query->where('category', $request->category);
        }

        $templates = $query->latest()->get();

        return response()->json([
            'message' => 'List template approved',
            'data' => $templates
        ]);
    }

    /**
     * 5. Fungsi untuk mendapatkan daftar kategori unik
     */
    public function categories()
    {
        $categories = Template::where('status', 'approved')
            ->select('category')
            ->distinct()
            ->pluck('category');
            
        // Tambahkan 'All' di paling depan
        $categories->prepend('All');

        return response()->json(['data' => $categories]);
    }
}