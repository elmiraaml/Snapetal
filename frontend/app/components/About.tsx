import { FaThLarge, FaCamera, FaSlidersH, FaDownload } from 'react-icons/fa';

// Sesuaikan dengan fitur aplikasimu
const steps = [
  { Icon: FaThLarge, title: 'Choose a layout', desc: 'Pick a photo strip frame that fits your mood.' },
  { Icon: FaCamera, title: 'Strike a pose', desc: 'Allow camera access and pose for each shot with a countdown.' },
  { Icon: FaSlidersH, title: 'Customize', desc: 'Adjust frame colors and add your own touch to the strip.' },
  { Icon: FaDownload, title: 'Download', desc: 'Save your finished strip and relive the memories anytime.' },
];

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen bg-[#F6DFE6] flex items-start justify-center p-4 pt-16 md:p-10 md:pt-20"
    >
      <div
        className="relative w-full max-w-6xl min-h-[85vh] md:min-h-0 md:aspect-[16/9] rounded-3xl overflow-hidden bg-cover bg-center bg-no-repeat flex flex-col"
        style={{ backgroundImage: "url('/bg-home.png')" }}
      >
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pt-24 md:pt-28 pb-8">
          {/* Judul: gaya sama seperti home */}
          <div className="flex items-baseline justify-center mb-3">
            <span className="font-[family-name:var(--font-great-vibes)] text-[80px] md:text-[120px] leading-[0.5] text-[#A25986] mr-1 md:mr-2 relative z-0">
              A
            </span>
            <h2 className="font-[family-name:var(--font-playfair)] text-[44px] md:text-[72px] leading-none text-[#A25986] tracking-tight relative z-10">
              bout
            </h2>
          </div>

          <p className="text-[15px] md:text-[18px] text-[#A25986] leading-snug max-w-md [text-shadow:0_0_10px_rgba(255,255,255,0.95)]">
            Just four quick steps between you<br />and your photo strip.
          </p>

          {/* 4 kartu langkah */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl">
            {steps.map(({ Icon, title, desc }, i) => (
              <div
                key={title}
                className="bg-white rounded-3xl px-5 py-6 shadow-[0_4px_15px_rgba(0,0,0,0.08)] flex flex-col items-center"
              >
                <div className="w-14 h-14 rounded-full bg-[#F8D3E2] flex items-center justify-center text-[#A25986]">
                  <Icon size={22} />
                </div>
                <span className="mt-3 text-[11px] tracking-[0.15em] font-semibold text-[#C4A5B9] uppercase">
                  Step {i + 1}
                </span>
                <h3 className="text-[#A25986] text-[16px] md:text-[18px] font-medium mt-1">{title}</h3>
                <p className="text-[#A25986]/70 text-[12px] md:text-[13px] mt-2 leading-snug">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}