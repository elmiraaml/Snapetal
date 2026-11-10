
'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 z-50 w-max max-w-[95%]"
      style={{
        top: '5.4%',
      }}
    >
      <nav className="bg-white rounded-full px-8 md:px-20 py-4 md:py-5 flex items-center justify-center gap-6 md:gap-12 shadow-[0_4px_10px_rgba(0,0,0,0.12)]">

        <Link
          href="/"
          className="text-[15px] md:text-[20px] text-[#A25986] font-medium transition-colors hover:text-[#d16b9e]"
        >
          home
        </Link>

        <Link
          href="#about"
          className="text-[15px] md:text-[20px] text-[#C4A5B9] hover:text-[#A25986] font-medium transition-colors"
        >
          about
        </Link>

        <Link
          href="#contact"
          className="text-[15px] md:text-[20px] text-[#C4A5B9] hover:text-[#A25986] font-medium transition-colors"
        >
          contact
        </Link>

      </nav>
    </div>
  );
}
