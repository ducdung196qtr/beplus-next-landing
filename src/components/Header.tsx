"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
  { id: "features", label: "Features" },
  { id: "how", label: "How it works" },
  { id: "demo", label: "Demo" },
  { id: "pricing", label: "Pricing" },
  { id: "faq", label: "FAQ" },
];

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current, 
        { y: -80, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
    }
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-[linear-gradient(135deg,#2271B1,#7F54B3)] flex items-center justify-center text-white font-extrabold text-sm">B</span>
          <span className="font-extrabold text-xl gradient-text">Beplus</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {SECTIONS.map(s => (
            <button key={s.id} onClick={() => scrollTo(s.id)} className="text-[#1E1E1E] font-medium text-sm hover:text-[#2271B1] transition-colors">
              {s.label}
            </button>
          ))}
          <a href="https://wordpress.org/plugins/beplus-fast-product-filter-live-search-for-woocommerce/" target="_blank"
             className="bg-[linear-gradient(135deg,#2271B1,#7F54B3)] text-white px-5 py-2.5 rounded-lg font-semibold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
            Download Free
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? <path d="M6 6L18 18M6 18L18 6"/> : <path d="M3 12h18M3 6h18M3 18h18"/>}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <nav className="md:hidden px-8 pb-6 space-y-4">
          {SECTIONS.map(s => (
            <button key={s.id} onClick={() => scrollTo(s.id)} className="block text-[#1E1E1E] font-medium py-2 w-full text-left">
              {s.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}

// React import
import { useState } from "react";
