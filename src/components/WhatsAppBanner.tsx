"use client";

import React from 'react';

const InstagramBanner: React.FC = () => {
  const instagramLink = "https://www.instagram.com/itambe.promocoes/";

  return (
    <div className="w-full mb-6 mt-2">
      <a
        href={instagramLink}
        target="_blank"
        rel="noopener noreferrer"
        className="block group"
      >
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] p-6 md:p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl group-hover:bg-white/20 transition-colors duration-300" />
          <div className="absolute -left-8 -bottom-8 h-24 w-24 rounded-full bg-black/5 blur-xl" />

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white shadow-inner transform rotate-3 group-hover:rotate-0 transition-transform duration-300">
                <svg
                  className="h-10 w-10 text-[#ee2a7b]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
              <div className="text-white">
                <h3 className="text-xl md:text-2xl font-bold tracking-tight">
                  Siga-nos no Instagram
                </h3>
                <p className="text-white/90 text-sm md:text-base opacity-90 mt-1">
                  Confira as melhores promoções e achadinhos da Shopee no nosso perfil!
                </p>
              </div>
            </div>

            <div className="shrink-0">
              <span className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#ee2a7b] font-bold rounded-full shadow-md group-hover:bg-gray-50 transition-colors duration-200">
                Seguir Perfil
                <svg
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default InstagramBanner;

