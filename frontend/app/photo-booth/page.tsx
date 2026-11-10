'use client';

import { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';

export default function PhotoBoothPage() {
  const webcamRef = useRef<Webcam>(null);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMirrorOn, setIsMirrorOn] = useState(true);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
    }
  }, [webcamRef]);

  const retake = () => {
    setCapturedImage(null);
  };

  return (
    <div
      className="relative min-h-screen font-[family-name:var(--font-inter)] pb-10 bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: "url('/bg-choose-layout.png')" }}
    >
      {/* Konten Utama - Rata Kiri */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 pt-12 md:pt-24 flex flex-col">
        
        {/* Header Text - CUMA INI YANG DIGANTI JADI TENGAH */}
        <div className="w-full text-center mb-8">
          <h1 className="text-4xl md:text-[64px] font-medium text-[#A25986] leading-none">
            get ready to click
          </h1>
        </div>

        {/* Toggle Controls & Help - TETAP RATA KIRI */}
        <div className="md:pl-[8%] flex items-center gap-3 md:gap-4 mb-6">
          <button
            onClick={() => setIsCameraOn(!isCameraOn)}
            className={`px-6 py-2.5 rounded-full text-sm md:text-base font-medium bg-white text-[#A25986] hover:bg-gray-50 transition-all shadow-sm ${
              !isCameraOn ? 'opacity-60' : ''
            }`}
          >
            Camera : {isCameraOn ? 'on' : 'off'}
          </button>

          <button
            onClick={() => setIsMirrorOn(!isMirrorOn)}
            className={`px-6 py-2.5 rounded-full text-sm md:text-base font-medium bg-white text-[#A25986] hover:bg-gray-50 transition-all shadow-sm ${
              !isMirrorOn ? 'opacity-60' : ''
            }`}
          >
            Mirror : {isMirrorOn ? 'on' : 'off'}
          </button>

          <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#A25986] shadow-sm hover:scale-105 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg>
          </button>
        </div>

        {/* Area Kamera / Preview - TETAP RATA KIRI */}
        <div className="w-full md:pl-[8%]">
          <div className="relative w-[95%] md:w-[85%] aspect-video bg-white rounded-[32px] overflow-hidden shadow-lg border border-white flex items-center justify-center">
            
            {capturedImage ? (
              <img 
                src={capturedImage} 
                alt="Captured" 
                className={`w-full h-full object-cover ${isMirrorOn ? 'scale-x-[-1]' : ''}`} 
              />
            ) : (
              isCameraOn ? (
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={{ facingMode: "user" }}
                  className={`w-full h-full object-cover ${isMirrorOn ? 'scale-x-[-1]' : ''}`}
                />
              ) : (
                <div className="text-[#A25986] flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mb-2 opacity-50">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                  <span className="opacity-50">Camera is Off</span>
                </div>
              )
            )}

            {/* Tombol Shutter (Kotak Tumpul) - Tengah Bawah */}
            {!capturedImage && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                <button
                  onClick={capture}
                  disabled={!isCameraOn}
                  className={`w-24 h-20 md:w-28 md:h-24 bg-[#F4A6B8] rounded-[24px] flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 ${
                    !isCameraOn ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-10 h-10 md:w-12 md:h-12">
                    <path d="M12 9a3 3 0 100 6 3 3 0 000-6z" />
                    <path fillRule="evenodd" d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            )}

            {/* Tombol Retake */}
            {capturedImage && (
              <div className="absolute bottom-8 right-8">
                <button
                  onClick={retake}
                  className="px-6 py-3 bg-white text-[#A25986] rounded-full font-semibold shadow-lg hover:bg-gray-100 transition-colors"
                >
                  Retake
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}