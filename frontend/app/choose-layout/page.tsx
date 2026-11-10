'use client';

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function ChooseLayout() {
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const catRes = await axios.get('http://127.0.0.1:8000/api/templates/categories');
        setCategories(catRes.data.data);

        const tplRes = await axios.get(`http://127.0.0.1:8000/api/templates?category=${activeCategory}`);
        setTemplates(tplRes.data.data);
      } catch (error) {
        console.error('Gagal mengambil data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeCategory]);

  // Geser satu "halaman" (3 frame) sekali klik
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -clientWidth : clientWidth,
        behavior: 'smooth',
      });
    }
  };

  // Kalau frame sedikit, ditengahkan
  const fewItems = templates.length <= 3;

  return (
    <div
      className="relative min-h-screen font-[family-name:var(--font-inter)] pb-10 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/bg-choose-layout.png')" }}
    >
      <div className="relative z-10 pt-[clamp(32px,12vh,170px)]">
        {/* Header */}
        <div className="text-center px-4">
          <h1 className="text-4xl md:text-[64px] text-[#A25986] leading-none">
            choose your layout
          </h1>
          <p className="text-[#A25986] text-base md:text-[24px] mt-2 max-w-[430px] mx-auto leading-[1.2]">
            Select from our collection of photo booth layouts
          </p>
        </div>

        {/* Container putih + carousel */}
        <div className="relative mx-auto mt-6 md:mt-10 w-[825px] max-w-[calc(100%-32px)]">
          {/* Tombol Kiri */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 md:-left-[117px] top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-[92px] md:h-[92px] bg-white rounded-full flex items-center justify-center text-3xl md:text-[44px] leading-none text-[#A25986] hover:scale-110 transition-all"
          >
            &lt;
          </button>

          <div className="bg-white rounded-[32px] px-4 pt-8 pb-8 md:px-0 md:pt-[46px] md:pb-10">
            <div
              ref={scrollRef}
              className={`flex overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden ${
                fewItems ? 'md:justify-center' : ''
              }`}
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {loading ? (
                <div className="w-full text-center text-[#A25986] py-20 animate-pulse">Memuat...</div>
              ) : templates.length === 0 ? (
                <div className="w-full text-center text-gray-400 py-20">Belum ada template.</div>
              ) : (
                templates.map((tpl) => (
                  <div
                    key={tpl.id}
                    className="snap-start shrink-0 basis-1/2 md:basis-1/3 flex flex-col items-center group cursor-pointer px-2"
                  >
                    <img
                      src={tpl.image_url}
                      alt={tpl.name}
                      className="h-[240px] md:h-[338px] w-auto object-contain transition-transform duration-300 group-hover:-translate-y-2"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://via.placeholder.com/300x600/f3f4f6/a1a1aa?text=No+Image';
                      }}
                    />
                    <h3 className="text-[#A25986] text-xs md:text-[14px] text-center mt-4 md:mt-6">{tpl.name}</h3>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Tombol Kanan */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-2 md:-right-[117px] top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-[92px] md:h-[92px] bg-white rounded-full flex items-center justify-center text-3xl md:text-[44px] leading-none text-[#A25986] hover:scale-110 transition-all"
          >
            &gt;
          </button>
        </div>

        {/* Kategori Filter: di bawah card */}
        <div className="flex justify-center gap-4 md:gap-10 mt-5 md:mt-6 flex-wrap px-4 max-w-[825px] mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`min-w-[85px] px-6 py-1.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-[#A25986] text-white'
                  : 'bg-white text-[#A25986] hover:bg-white/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}