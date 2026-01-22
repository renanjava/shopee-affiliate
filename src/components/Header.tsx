"use client";

import { useState } from "react";

interface HeaderProps {
  onSearch: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const instagramLink = "https://www.instagram.com/itambe.promocoes/";

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-shopee-border">
      <div className="bg-gradient-to-r from-shopee-orange to-shopee-secondary py-1.5 px-6 text-center text-white text-[0.75rem] font-medium tracking-wide">
        🔥 AS MELHORES OFERTAS DA SHOPEE SELECIONADAS PARA VOCÊ
      </div>
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-4 flex justify-between items-center bg-white">
        <button 
          onClick={handleLogoClick}
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <div className="bg-shopee-orange p-2 rounded-xl shadow-shopee-sm">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <h1 className="text-[1.25rem] md:text-[1.5rem] font-black m-0 leading-tight tracking-tight text-shopee-text-primary">
              ITAMBÉ<span className="text-shopee-orange">PROMOÇÕES</span>
            </h1>
            <p className="text-[0.7rem] md:text-[0.8rem] text-shopee-text-secondary font-medium uppercase tracking-widest hidden sm:block">
              Curadoria de Ofertas VIP
            </p>
          </div>
        </button>

        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="hidden lg:flex items-center bg-shopee-bg border border-shopee-border rounded-full px-4 py-2 w-[350px]">
            <svg className="w-4 h-4 text-shopee-text-light mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="O que você está procurando?"
              className="flex-1 bg-transparent outline-none text-shopee-text-primary text-sm placeholder:text-shopee-text-secondary"
            />
          </form>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleSearch}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-shopee-orange/10 text-shopee-orange lg:hidden hover:bg-shopee-orange/20 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <a
              href={instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-shopee-orange hover:bg-shopee-hover text-white px-4 md:px-5 py-2.5 rounded-full text-[0.85rem] font-bold shadow-shopee-sm transition-all active:scale-95 flex items-center gap-2"
            >
              <span className="hidden sm:inline">Instagram</span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

          </div>
        </div>
      </div>
    </header>
  );
}
