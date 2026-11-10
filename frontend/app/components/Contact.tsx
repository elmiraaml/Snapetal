'use client';

import { useState, type ChangeEvent } from 'react';
import { FaEnvelope, FaInstagram, FaTiktok } from 'react-icons/fa';

// Ganti dengan kontak kamu yang asli
const EMAIL = 'your@email.com';
const socials = [
  { label: '@yourname', href: 'https://instagram.com/yourname', Icon: FaInstagram },
  { label: '@yourname', href: 'https://tiktok.com/@yourname', Icon: FaTiktok },
];

const inputClass =
  'w-full bg-white rounded-xl px-4 py-2.5 text-[14px] text-[#A25986] placeholder-[#C4A5B9] outline-none focus:ring-2 focus:ring-[#A25986]/40';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Tanpa backend: buka aplikasi email dengan isi yang sudah terisi
  const handleSend = () => {
    const subject = encodeURIComponent(`Message from ${form.name || 'Snapbooth visitor'}`);
    const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name} (${form.email})`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="contact"
      className="min-h-screen bg-[#F6DFE6] flex items-start justify-center p-4 pt-16 md:p-10 md:pt-20"
    >
      <div
        className="relative w-full max-w-6xl min-h-[85vh] md:min-h-0 md:aspect-[16/9] rounded-3xl overflow-hidden bg-cover bg-center bg-no-repeat flex flex-col"
        style={{ backgroundImage: "url('/bg-home.png')" }}
      >
        <div className="relative z-10 flex-1 flex items-center justify-center px-4 md:px-10 pt-24 md:pt-28 pb-8">
          {/* Panel putih besar */}
          <div className="bg-white rounded-[32px] w-full max-w-4xl p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {/* Kiri: teks + kontak */}
            <div className="flex flex-col justify-center text-left">
              <div className="flex items-baseline mb-3">
                <span className="font-[family-name:var(--font-great-vibes)] text-[64px] md:text-[96px] leading-[0.5] text-[#A25986] mr-1 relative z-0">
                  L
                </span>
                <h2 className="font-[family-name:var(--font-playfair)] text-[36px] md:text-[52px] leading-none text-[#A25986] tracking-tight relative z-10">
                  et&apos;s talk
                </h2>
              </div>

              <p className="text-[#A25986]/80 text-[14px] md:text-[15px] leading-relaxed">
                Got a question, an idea, or just want to say hi? Send us a message
                and we&apos;ll get back to you.
              </p>

              <div className="mt-5 flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#F8D3E2] flex items-center justify-center text-[#A25986] shrink-0">
                  <FaEnvelope size={16} />
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.15em] font-semibold text-[#C4A5B9] uppercase">Email</p>
                  <p className="text-[#A25986] text-[14px] md:text-[15px]">{EMAIL}</p>
                </div>
              </div>

              <p className="mt-5 text-[10px] tracking-[0.15em] font-semibold text-[#C4A5B9] uppercase">
                Or say hi on socials
              </p>
              <div className="mt-2 flex flex-wrap gap-3">
                {socials.map(({ label, href, Icon }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-[#FDF2F5] text-[#A25986] text-[13px] md:text-[14px] px-4 py-2 rounded-full hover:scale-105 transition-transform duration-300 font-medium"
                  >
                    <Icon size={15} />
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Kanan: form */}
            <div className="bg-[#FDF2F5] rounded-3xl p-5 md:p-6 flex flex-col gap-3">
              <h3 className="text-[#A25986] text-[18px] md:text-[20px] font-medium">Write to us</h3>

              <label className="text-[12px] font-medium text-[#A25986]">
                Name
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="What should we call you?"
                  className={`${inputClass} mt-1`}
                />
              </label>

              <label className="text-[12px] font-medium text-[#A25986]">
                Email
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`${inputClass} mt-1`}
                />
              </label>

              <label className="text-[12px] font-medium text-[#A25986]">
                Message
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="What's on your mind?"
                  className={`${inputClass} mt-1 resize-none`}
                />
              </label>

              <button
                onClick={handleSend}
                className="self-end bg-[#A25986] text-white text-[15px] px-8 py-2.5 rounded-full hover:scale-105 transition-transform duration-300 font-medium"
              >
                send message
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}