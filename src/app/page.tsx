"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./globals.css";

gsap.registerPlugin(ScrollTrigger);

const FILTER_PILLS = ["All", "Clothing", "Accessories", "Shoes", "$10-$50"];
const PRODUCTS = [
  { emoji: "👕", name: "Cotton T-Shirt", price: "$29.99" },
  { emoji: "👖", name: "Slim Jeans", price: "$59.99" },
  { emoji: "🧥", name: "Winter Jacket", price: "$129.99" },
  { emoji: "👟", name: "Running Shoes", price: "$89.99" },
  { emoji: "👜", name: "Leather Bag", price: "$79.99" },
  { emoji: "🧢", name: "Baseball Cap", price: "$19.99" },
];

function SectionLabel({ text }: { text: string }) {
  return <span className="inline-block text-[13px] font-semibold text-[#2271B1] uppercase tracking-wider mb-3">{text}</span>;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-3xl md:text-4xl font-extrabold text-[#1E1E1E] mb-4">{children}</h2>;
}

function AnimateIn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(ref.current, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%" }
      });
    }
  }, []);
  return <div ref={ref} className={className}>{children}</div>;
}

function HeroMockup() {
  const [activeFilter, setActiveFilter] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(ref.current, { x: 80, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power4.out", delay: 0.3 });
    }
    const interval = setInterval(() => setActiveFilter(p => (p + 1) % FILTER_PILLS.length), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={ref} className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#E5E7EB]">
      <div className="bg-[#F0F4FF] px-4 py-3 flex gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]"/>
        <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]"/>
        <span className="w-2.5 h-2.5 rounded-full bg-[#27CA40]"/>
      </div>
      <div className="p-5">
        <div className="flex gap-2 flex-wrap mb-4">
          {FILTER_PILLS.map((p, i) => (
            <span key={i} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${i === activeFilter ? "bg-[#2271B1] text-white shadow-md" : "bg-[#F8F9FA] text-[#6B7280] border border-[#E5E7EB]"}`}>{p}</span>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-3">
          {PRODUCTS.map((p, i) => (
            <div key={i} className="bg-[#F8F9FA] border border-[#E5E7EB] rounded-lg p-3 text-center">
              <div className="h-16 bg-gradient-to-br from-[#E8EFFF] to-[#F5EEFF] rounded-md flex items-center justify-center text-2xl mb-2">{p.emoji}</div>
              <div className="text-[11px] font-semibold text-[#1E1E1E]">{p.name}</div>
              <div className="text-[11px] font-semibold text-[#2271B1]">{p.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const statRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(heroRef.current.querySelectorAll('.hero-text'), 
        { y: 40, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" }
      );
    }
    // Animate stat counters
    statRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(el, { textContent: "0" }, {
        scrollTrigger: { trigger: el, start: "top 90%" },
        duration: 2, ease: "power2.out",
        snap: { textContent: 1 },
        textContent: el.dataset.value || "0",
      });
    });
  }, []);

  return (
    <main className="overflow-x-hidden">
      {/* ───── HERO ───── */}
      <section ref={heroRef} className="min-h-screen flex items-center bg-gradient-to-b from-[#F0F4FF] to-white relative overflow-hidden">
        {/* Decorative gradient orbs */}
        <div className="absolute top-20 -left-20 w-72 h-72 bg-[#7F54B3]/10 rounded-full blur-3xl"/>
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-[#2271B1]/8 rounded-full blur-3xl"/>
        
        <div className="max-w-7xl mx-auto px-8 py-32 grid lg:grid-cols-2 gap-12 items-center w-full">
          <div>
            <span className="hero-text block bg-white border border-[#E5E7EB] px-4 py-1.5 rounded-full text-sm font-medium mb-6 shadow-sm inline-flex items-center gap-2">
              <span className="w-2 h-2 bg-[#46B450] rounded-full animate-pulse"/> Native Gutenberg Blocks — Just Released
            </span>
            <h1 className="hero-text text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-6">
              Instant Product
              <br/>
              <span className="gradient-text">Filtering & Search</span>
              <br/>
              for WooCommerce
            </h1>
            <p className="hero-text text-lg text-[#6B7280] mb-8 max-w-lg leading-relaxed">
              Two native Gutenberg blocks. Zero page refreshes. AJAX-powered results that keep your customers shopping — not waiting.
            </p>
            <div className="hero-text flex flex-wrap gap-4 mb-8">
              <a href="https://woo-advanced-filter.beplusthemes.com/shop/" target="_blank" 
                className="inline-flex items-center gap-2 bg-[linear-gradient(135deg,#2271B1,#7F54B3)] text-white px-7 py-3.5 rounded-xl font-semibold shadow-lg shadow-[#2271B1]/25 hover:-translate-y-0.5 hover:shadow-xl transition-all">
                Try Live Demo
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a href="https://wordpress.org/plugins/beplus-fast-product-filter-live-search-for-woocommerce/" target="_blank"
                className="inline-flex items-center gap-2 border-2 border-[#E5E7EB] px-7 py-3.5 rounded-xl font-semibold hover:border-[#2271B1] hover:text-[#2271B1] transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                Download Free
              </a>
            </div>
            <div className="hero-text flex gap-6 text-sm text-[#6B7280] flex-wrap">
              <span className="flex items-center gap-1.5"><span className="text-[#46B450]">✓</span> WordPress 6.5+</span>
              <span className="flex items-center gap-1.5"><span className="text-[#46B450]">✓</span> WooCommerce Ready</span>
              <span className="flex items-center gap-1.5"><span className="text-[#46B450]">✓</span> 100% Gutenberg Native</span>
            </div>
          </div>
          <div className="hidden lg:block">
            <HeroMockup />
          </div>
        </div>
      </section>

      {/* ───── PAIN POINTS ───── */}
      <section className="section-padding"><div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-14">
          <SectionLabel text="The Problem"/>
          <SectionTitle>Your Customers Deserve Better</SectionTitle>
          <p className="text-[#6B7280] text-lg max-w-lg mx-auto">Default WooCommerce browsing is slow. Here's what's costing you sales.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: "🐌", title: "Slow Product Browsing", text: "Customers wait 2-4s for page reloads. Beplus delivers results in under 200ms via AJAX." },
            { icon: "🔍", title: "Poor Search Experience", text: "Default search doesn't show thumbnails or prices. Beplus Live Search shows it all with typo correction." },
            { icon: "💸", title: "Lost Sales", text: "53% of shoppers abandon if search is slow. Real-time results keep them engaged and buying." },
          ].map((p, i) => (
            <AnimateIn key={i} className="bg-white border border-[#E5E7EB] rounded-2xl p-7 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="text-3xl mb-4">{p.icon}</div>
              <h3 className="text-lg font-bold mb-2">{p.title}</h3>
              <p className="text-[#6B7280] text-sm leading-relaxed">{p.text}</p>
            </AnimateIn>
          ))}
        </div>
      </div></section>

      {/* ───── FEATURES ───── */}
      <section id="features" className="section-padding bg-[#F8F9FA]"><div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-14">
          <SectionLabel text="Features"/>
          <SectionTitle>Supercharge Product Discovery</SectionTitle>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "🔍", t: "Live Search Block", d: "Smart autocomplete with thumbnails, prices, add-to-cart. Typo-tolerant. Category filtering." },
            { icon: "🏷️", t: "8+ Filter Types", d: "Keyword, category, tag, attributes, price range, stock, on-sale, featured, rating — all AJAX." },
            { icon: "⚡", t: "Pre-built Cache", d: "Filter data pre-built & auto-refreshed. Large catalogs stay fast. <200ms responses." },
            { icon: "🧩", t: "Native Gutenberg", d: "Full InspectorControls, ServerSideRender. Drop anywhere in Site Editor. No code needed." },
            { icon: "🛡️", t: "Graceful Degradation", d: "Without JS, filters fall back to GET form. ARIA, keyboard nav, live regions built in." },
            { icon: "🌍", t: "i18n & RTL Ready", d: "Fully internationalized. RTL support. Works with any WooCommerce-compatible block theme." },
          ].map((f, i) => (
            <AnimateIn key={i} className="bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="text-2xl mb-3">{f.icon}</div>
              <h3 className="font-bold mb-2">{f.t}</h3>
              <p className="text-[#6B7280] text-sm leading-relaxed">{f.d}</p>
            </AnimateIn>
          ))}
        </div>
      </div></section>

      {/* ───── HOW IT WORKS ───── */}
      <section id="how" className="section-padding"><div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-14">
          <SectionLabel text="How It Works"/>
          <SectionTitle>Three Steps to a Faster Store</SectionTitle>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { num: "1", icon: "🧱", t: "Drop the Block", d: "Open Site Editor → add the block above your product grid. Visually, no shortcodes." },
            { num: "2", icon: "⚙️", t: "Configure Filters", d: "Pick categories, attributes, price ranges from InspectorControls. Done in seconds." },
            { num: "3", icon: "✅", t: "That's It!", d: "Customers filter & search in real time. No reloads, no lost scroll, just instant results." },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="h-24 bg-[#F8F9FA] rounded-2xl flex items-center justify-center text-4xl mb-6 border-2 border-dashed border-[#E5E7EB]">{s.icon}</div>
              <div className="w-12 h-12 rounded-full bg-[linear-gradient(135deg,#2271B1,#7F54B3)] text-white text-xl font-extrabold flex items-center justify-center mx-auto mb-4">{s.num}</div>
              <h3 className="font-bold mb-2">{s.t}</h3>
              <p className="text-[#6B7280] text-sm">{s.d}</p>
            </div>
          ))}
        </div>
      </div></section>

      {/* ───── DEMO ───── */}
      <section id="demo" className="section-padding bg-[#F8F9FA]"><div className="max-w-7xl mx-auto px-8 text-center">
        <SectionLabel text="Live Demos"/>
        <SectionTitle>See It in Action</SectionTitle>
        <div className="inline-flex gap-1 bg-[#E5E7EB] p-1 rounded-full mt-8 mb-6">
          <button className="px-5 py-2 bg-white rounded-full text-sm font-semibold shadow-sm text-[#2271B1]">Product Filter (AJAX)</button>
          <button className="px-5 py-2 rounded-full text-sm font-medium text-[#6B7280] hover:text-[#2271B1] transition-colors">Live Search</button>
        </div>
        <div className="max-w-2xl mx-auto bg-white border-2 border-[#E5E7EB] rounded-2xl p-16">
          <div className="text-3xl mb-4">🔗</div>
          <p className="font-semibold mb-6">Explore the full interactive demo</p>
          <a href="https://woo-advanced-filter.beplusthemes.com/shop/" target="_blank"
            className="inline-flex items-center gap-2 bg-[linear-gradient(135deg,#2271B1,#7F54B3)] text-white px-7 py-3.5 rounded-xl font-semibold shadow-lg shadow-[#2271B1]/25 hover:-translate-y-0.5 transition-all">
            Open Live Demo <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
          </a>
        </div>
      </div></section>

      {/* ───── STATS ───── */}
      <section className="py-16 bg-[linear-gradient(135deg,#2271B1,#7F54B3)] text-white"><div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "200", suffix: "ms", label: "Response Time" },
            { value: "8", suffix: "+", label: "Filter Types" },
            { value: "2", suffix: "", label: "Gutenberg Blocks" },
            { value: "100", suffix: "%", label: "AJAX Powered" },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-4xl md:text-5xl font-extrabold mb-1" ref={el => { statRefs.current[i] = el; }} data-value={s.value}>{s.value}<span className="text-2xl">{s.suffix}</span></div>
              <div className="text-sm opacity-80">{s.label}</div>
            </div>
          ))}
        </div>
      </div></section>

      {/* ───── TESTIMONIALS ───── */}
      <section className="section-padding"><div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-14">
          <SectionLabel text="Testimonials"/>
          <SectionTitle>Loved by Store Owners</SectionTitle>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { q: "\u201C", t: "Finally a product filter that actually works with block themes. No more wrestling with shortcodes and page builders.", a: "Sarah L., Store Owner" },
            { q: "\u201C", t: "The live search with product thumbnails and add-to-cart boosted my mobile conversions by 18% in the first week.", a: "James K., WooCommerce Developer" },
            { q: "\u201C", t: "AJAX filtering is so smooth, my page speed actually improved after switching. Great developer experience.", a: "Maria T., Agency Owner" },
          ].map((t, i) => (
            <AnimateIn key={i} className="bg-white border border-[#E5E7EB] rounded-2xl p-7">
              <div className="text-4xl text-[#7F54B3] mb-3 leading-none">{t.q}</div>
              <p className="text-[#1E1E1E] mb-4 leading-relaxed">{t.t}</p>
              <div className="text-sm text-[#6B7280] font-semibold">{t.a}</div>
            </AnimateIn>
          ))}
        </div>
      </div></section>

      {/* ───── PRICING ───── */}
      <section id="pricing" className="section-padding bg-[#F8F9FA]"><div className="max-w-7xl mx-auto px-8 text-center">
        <SectionLabel text="Pricing"/>
        <SectionTitle>Simple, Transparent Pricing</SectionTitle>
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mt-12">
          <div className="bg-white border-2 border-[#E5E7EB] rounded-2xl p-8 text-left hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-bold mb-2">Free Core</h3>
            <div className="text-4xl font-extrabold mb-6">$0 <span className="text-base font-normal text-[#6B7280]">/ forever</span></div>
            <ul className="space-y-3 mb-8">
              {["2 Gutenberg blocks","8+ filter types","AJAX live search","Typo tolerance","ARIA accessibility","i18n ready"].map(l => (
                <li key={l} className="flex items-center gap-2 text-sm"><span className="text-[#46B450]">✓</span> {l}</li>
              ))}
            </ul>
            <a href="https://wordpress.org/plugins/beplus-fast-product-filter-live-search-for-woocommerce/" target="_blank"
              className="block text-center bg-[linear-gradient(135deg,#2271B1,#7F54B3)] text-white py-3 rounded-xl font-semibold shadow-md hover:-translate-y-0.5 transition-all">
              Download Free
            </a>
          </div>
          <div className="bg-white border-2 border-[#7F54B3] rounded-2xl p-8 text-left relative shadow-lg">
            <span className="absolute -top-3 right-6 bg-[#7F54B3] text-white text-xs font-semibold px-3 py-1 rounded-full">Coming Soon</span>
            <h3 className="text-xl font-bold mb-2">Pro</h3>
            <div className="text-2xl font-extrabold mb-6 text-[#6B7280]">Coming Soon</div>
            <ul className="space-y-3 mb-8">
              {["Everything in Free","Premium analytics","Custom filter styling","Priority support","Advanced caching","Premium integrations"].map(l => (
                <li key={l} className="flex items-center gap-2 text-sm"><span className="text-[#46B450]">✓</span> {l}</li>
              ))}
            </ul>
            <button className="block w-full text-center border-2 border-[#E5E7EB] py-3 rounded-xl font-semibold text-[#6B7280] cursor-default">Join Waitlist</button>
          </div>
        </div>
      </div></section>

      {/* ───── FAQ ───── */}
      <section id="faq" className="section-padding"><div className="max-w-3xl mx-auto px-8">
        <div className="text-center mb-12">
          <SectionLabel text="FAQ"/>
          <SectionTitle>Frequently Asked Questions</SectionTitle>
        </div>
        <div className="space-y-1">
          {[
            ["Does this work with block themes?", "Yes! Native Gutenberg blocks designed for block themes and FSE. Compatible with Twenty Twenty-Five and other modern themes."],
            ["Can I use only one of the blocks?", "Absolutely. Use the filter panel on your shop page, the search bar in your header, or both. They work together or independently."],
            ["Does it support custom taxonomies?", "Yes! Expose any custom product taxonomy as a filter — Brand, Material, Season, or your own."],
            ["Will this slow down my store?", "No — it often improves perceived speed. Pre-built cache with auto-refresh. AJAX responses in under 200ms."],
            ["Can I customize the look and feel?", "Yes. The blocks respect your theme's styles and include block settings for accent colors, layout, and more. CSS hooks available."],
            ["Does it work with page builders?", "Built as native Gutenberg blocks. Works with any builder that supports WordPress blocks. Best with FSE block themes."],
            ["Is WooCommerce required?", "Yes. Both blocks require WooCommerce to be active with products. Filter and search data come from WooCommerce."],
            ["Does it support variable products?", "Yes. Variable and grouped products are fully supported with price ranges in search and proper filter handling."],
          ].map(([q, a], i) => (
            <details key={i} className="group border-b border-[#E5E7EB]">
              <summary className="py-5 cursor-pointer font-semibold flex justify-between items-center list-none [&::-webkit-details-marker]:hidden">
                {q} <span className="text-[#6B7280] text-xl group-open:hidden">+</span><span className="text-[#6B7280] text-xl hidden group-open:inline">−</span>
              </summary>
              <p className="pb-5 text-[#6B7280] text-sm leading-relaxed">{a}</p>
            </details>
          ))}
        </div>
      </div></section>

      {/* ───── CTA BANNER ───── */}
      <section className="section-padding bg-gradient-to-b from-white to-[#F0F4FF] text-center"><div className="max-w-3xl mx-auto px-8">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Give Your Customers the Search Experience They Deserve</h2>
        <p className="text-[#6B7280] text-lg mb-8">Free, open-source, and takes 3 minutes to set up.</p>
        <a href="https://wordpress.org/plugins/beplus-fast-product-filter-live-search-for-woocommerce/" target="_blank"
          className="inline-flex items-center gap-2 bg-[linear-gradient(135deg,#2271B1,#7F54B3)] text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl shadow-[#2271B1]/25 hover:-translate-y-0.5 hover:shadow-2xl transition-all">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
          Download on WordPress.org
        </a>
        <p className="mt-5 text-sm text-[#6B7280]">WordPress 6.5+ · WooCommerce Ready · 100% Gutenberg Native</p>
      </div></section>

      {/* ───── FOOTER ───── */}
      <footer className="border-t border-[#E5E7EB] py-8"><div className="max-w-7xl mx-auto px-8 flex justify-between items-center flex-wrap gap-4 text-sm text-[#6B7280]">
        <span className="flex items-center gap-2 font-extrabold text-base gradient-text">⚡ Beplus</span>
        <span>© 2026 Beplus · <a href="https://wordpress.org/plugins/beplus-fast-product-filter-live-search-for-woocommerce/" target="_blank" className="text-[#2271B1] hover:underline">Plugin on WordPress.org</a></span>
      </div></footer>
    </main>
  );
}
