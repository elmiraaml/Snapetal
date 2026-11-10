import Link from 'next/link';
import Navbar from './components/Navbar';
import About from './components/About';
import Contact from './components/Contact';

export default function Home() {
  return (
    <>
      <main
        id="home"
        className="relative w-full h-screen bg-[#F6DFE6] flex items-center justify-center overflow-hidden"
      >
        {/* Kartu hero: ukuran font diskalakan dari lebar kartu (cqw), bukan viewport */}
        <div
          className="relative w-[min(92vw,72rem)] md:w-[min(92vw,72rem,160vh)] min-h-[85vh] md:min-h-0 md:aspect-[16/9] rounded-3xl overflow-hidden bg-cover bg-center bg-no-repeat flex flex-col"
          style={{
            backgroundImage: "url('/bg-home.png')",
            containerType: 'inline-size',
          }}
        >
          {/* Navbar */}
          <Navbar />

          {/* Konten utama */}
          <div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4"
            style={{
              transform: 'translateY(8.86%)',
            }}
          >
            {/* Judul Photobooth */}
            <div className="flex items-baseline justify-center mb-1 md:mb-2">
              <span
                className="font-[family-name:var(--font-great-vibes)] leading-[0.5] text-[#A25986] mr-1 md:mr-2 relative z-0"
                style={{ fontSize: 'max(85px, 10.07cqw)' }}
              >
                P
              </span>

              <h1
                className="font-[family-name:var(--font-playfair)] leading-none text-[#A25986] tracking-tight relative z-10"
                style={{ fontSize: 'max(42px, 6.11cqw)' }}
              >
                hotobooth
              </h1>
            </div>

            {/* Deskripsi */}
            <p
              className="text-[#A25986] leading-snug mb-7 md:mb-12 max-w-md"
              style={{ fontSize: 'max(13px, 1.25cqw)' }}
            >
              Capture the moment, cherish the magic,
              <br />
              relive the love
            </p>

            {/* Tombol Start */}
            <Link
              href="/choose-layout"
              className="bg-white text-[#A25986] px-12 py-2.5 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.12)] hover:scale-105 transition-transform duration-300 font-medium"
              style={{ fontSize: 'max(16px, 1.25cqw)' }}
            >
              start
            </Link>
          </div>
        </div>
      </main>

      <About />
      <Contact />
    </>
  );
}