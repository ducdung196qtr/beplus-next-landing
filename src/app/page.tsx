"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./globals.css";

gsap.registerPlugin(ScrollTrigger);

const GRAD = "linear-gradient(135deg, #2271B1 0%, #7F54B3 100%)";

// ─── Mockup data ───
const FILTER_CATEGORIES = [
  { label: "T-Shirts", icon: "👕", color: "#FF6B6B" },
  { label: "Jeans", icon: "👖", color: "#4ECDC4" },
  { label: "Shoes", icon: "👟", color: "#45B7D1" },
  { label: "Bags", icon: "👜", color: "#F7DC6F" },
  { label: "Hats", icon: "🧢", color: "#BB8FCE" },
];

const CATEGORY_PRODUCTS: Record<string, { emoji: string; name: string; price: string; stars: number }[]> = {
  "T-Shirts": [
    { emoji: "👕", name: "Cotton T-Shirt", price: "$29.99", stars: 5 },
    { emoji: "👔", name: "Polo Classic", price: "$49.99", stars: 4 },
    { emoji: "🎽", name: "Tank Top", price: "$19.99", stars: 5 },
    { emoji: "🧵", name: "Henley Shirt", price: "$39.99", stars: 4 },
    { emoji: "👚", name: "V-Neck Tee", price: "$24.99", stars: 5 },
    { emoji: "🦺", name: "Graphic Tee", price: "$34.99", stars: 3 },
  ],
  "Jeans": [
    { emoji: "👖", name: "Slim Fit Jeans", price: "$79.99", stars: 5 },
    { emoji: "👖", name: "Straight Leg", price: "$69.99", stars: 4 },
    { emoji: "👖", name: "Skinny Jeans", price: "$59.99", stars: 4 },
    { emoji: "👖", name: "Bootcut Jean", price: "$89.99", stars: 5 },
    { emoji: "👖", name: "Relaxed Fit", price: "$74.99", stars: 3 },
    { emoji: "👖", name: "Distressed", price: "$99.99", stars: 5 },
  ],
  "Shoes": [
    { emoji: "👟", name: "Running Shoes", price: "$129.99", stars: 5 },
    { emoji: "👠", name: "Classic Heels", price: "$89.99", stars: 4 },
    { emoji: "👞", name: "Loafers", price: "$109.99", stars: 4 },
    { emoji: "🥾", name: "Hiking Boots", price: "$149.99", stars: 5 },
    { emoji: "👡", name: "Sandals", price: "$49.99", stars: 3 },
    { emoji: "🏀", name: "Basketball", price: "$159.99", stars: 5 },
  ],
  "Bags": [
    { emoji: "👜", name: "Leather Tote", price: "$149.99", stars: 5 },
    { emoji: "🎒", name: "Urban Backpack", price: "$89.99", stars: 4 },
    { emoji: "💼", name: "Briefcase", price: "$199.99", stars: 5 },
    { emoji: "🛍️", name: "Shoulder Bag", price: "$69.99", stars: 4 },
    { emoji: "👝", name: "Clutch Purse", price: "$39.99", stars: 3 },
    { emoji: "🧳", name: "Travel Duffel", price: "$119.99", stars: 5 },
  ],
  "Hats": [
    { emoji: "🧢", name: "Baseball Cap", price: "$24.99", stars: 5 },
    { emoji: "🎩", name: "Fedora Hat", price: "$49.99", stars: 4 },
    { emoji: "👒", name: "Sun Hat", price: "$34.99", stars: 4 },
    { emoji: "⛑️", name: "Bucket Hat", price: "$29.99", stars: 3 },
    { emoji: "🎓", name: "Beanie", price: "$19.99", stars: 5 },
    { emoji: "🪖", name: "Visor Cap", price: "$22.99", stars: 4 },
  ],
};
const PRICE_RANGES = ["All Prices", "$0-$25", "$25-$50", "$50-$100", "$100+"];

// ─── Section animation ───
function AnimateSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    gsap.fromTo(el, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, delay, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } });
  }, []);
  return <div ref={ref} className={className}>{children}</div>;
}

function SectionBadge({ text }: { text: string }) {
  return <span className="text-xs font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full border border-[var(--accent)]/30 text-[var(--accent)] bg-[var(--accent)]/5">{text}</span>;
}

function Stars({ n }: { n: number }) {
  return <span className="text-yellow-500 text-[10px] tracking-tight">{"★".repeat(n)}{"☆".repeat(5-n)}</span>;
}

// ─── Gradient button component ───
function GradBtn({ href, children, large }: { href: string; children: React.ReactNode; large?: boolean }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 text-white font-semibold shadow-lg ${large ? "px-8 py-4 rounded-xl text-base" : "px-6 py-3 rounded-xl text-sm"}`}
      style={{ background: GRAD, transition: "opacity 200ms" }}
      onMouseEnter={e => (e.currentTarget.style.opacity = "0.9")}
      onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
      {children}
    </a>
  );
}

// ─── Interactive Mockup ───
function HeroMockup() {
  const [activeFilter, setActiveFilter] = useState(0);
  const [selPrice, setSelPrice] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const mockupRef = useRef<HTMLDivElement>(null);
  const cat = FILTER_CATEGORIES[activeFilter];
  const products = CATEGORY_PRODUCTS[cat.label] || [];
  const filtered = searchTerm
    ? products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : selPrice > 0
      ? products.filter(p => { const price = parseFloat(p.price.replace("$", "")); const ranges = [[0,25],[25,50],[50,100],[100,999]]; const [lo,hi]=ranges[selPrice-1]; return price>=lo&&price<hi; })
      : products;

  // Auto-cycle through categories and simulate typing
  useEffect(() => {
    if (!mockupRef.current) return;
    gsap.fromTo(mockupRef.current, { x: 80, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power4.out", delay: 0.4 });
  }, []);

  useEffect(() => {
    const items = mockupRef.current?.querySelectorAll(".product-card");
    if (items) gsap.fromTo(items, { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, stagger: 0.04, ease: "back.out(1.2)" });
  }, [activeFilter, selPrice, searchTerm]);

  // Auto-cycle: rotate categories and simulate typing
  useEffect(() => {
    const searchTerms = ["cotton", "classic", "shirt", "premium", "blue", "", "cotton", "polo"];
    let termIdx = 0;
    const interval = setInterval(() => {
      const nextFilter = (activeFilter + 1) % FILTER_CATEGORIES.length;
      setActiveFilter(nextFilter);
      setSearchTerm(searchTerms[termIdx % searchTerms.length]);
      setSelPrice(0);
      termIdx++;
    }, 3000);
    return () => clearInterval(interval);
  }, [activeFilter]);

  return (
    <div ref={mockupRef} className="bg-[var(--card)] rounded-2xl shadow-2xl overflow-hidden border border-[var(--border)] w-full max-w-[520px]">
      <div className="bg-[var(--bg-alt)] px-4 py-3 flex gap-1.5 border-b border-[var(--border)]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]"/><span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]"/><span className="w-2.5 h-2.5 rounded-full bg-[#27CA40]"/>
        <span className="ml-2 text-[10px] text-[var(--text-muted)] truncate">Shop — beplusthemes.com</span>
      </div>
      <div className="p-5">
        <div className="relative mb-4">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input type="text" placeholder="Search products..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-lg border border-[var(--border)] bg-[var(--bg)] placeholder:text-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--primary)] transition-colors"/>
        </div>
        <div className="flex gap-1.5 flex-wrap mb-4">
          {FILTER_CATEGORIES.map((c, i) => (
            <button key={i} onClick={() => { setActiveFilter(i); setSelPrice(0); setSearchTerm(""); }}
              className="relative px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide whitespace-nowrap"
              style={{ backgroundColor: activeFilter===i ? c.color : 'var(--bg-alt)', color: activeFilter===i ? 'white' : 'var(--text-muted)',
                boxShadow: activeFilter===i ? `0 2px 12px ${c.color}40` : 'none', transform: activeFilter===i ? 'scale(1.05)' : 'scale(1)', transition: 'all 0.5s' }}>
              <span className="mr-1">{c.icon}</span>{c.label}
            </button>
          ))}
        </div>
        <div className="flex gap-1.5 mb-4">
          {PRICE_RANGES.map((r, i) => (
            <button key={i} onClick={() => { setSelPrice(i); setSearchTerm(""); }}
              className="text-[10px] font-medium px-2 py-1 rounded-md"
              style={{ backgroundColor: selPrice===i ? 'var(--primary)' : 'var(--bg-alt)', color: selPrice===i ? 'white' : 'var(--text-muted)', transition: 'all 0.3s' }}>
              {r}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2.5 min-h-[200px]">
          {filtered.map((p, i) => (
            <div key={i} className="product-card bg-[var(--bg)] border border-[var(--border)] rounded-xl p-2.5 hover:shadow-lg transition-shadow duration-300 group cursor-pointer">
              <div className="h-14 bg-gradient-to-br from-[var(--bg-alt)] to-[var(--primary)]/5 rounded-lg flex items-center justify-center text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">{p.emoji}</div>
              <div className="text-[10px] font-semibold truncate">{p.name}</div>
              <Stars n={p.stars} />
              <div className="text-[11px] font-bold text-[var(--primary)] mt-0.5">{p.price}</div>
            </div>
          ))}
          {filtered.length===0 && <div className="col-span-3 text-center py-8 text-[var(--text-muted)] text-xs">No products match</div>}
        </div>
        <div className="flex justify-center mt-4">
          <span className="text-[10px] bg-[var(--accent)]/10 text-[var(--accent)] px-2 py-0.5 rounded-full font-medium">⚡ AJAX Response: {Math.floor(Math.random()*50+80)}ms</span>
        </div>
      </div>
    </div>
  );
}

// ─── Demo Tabs ───
function DemoTabs() {
  const [tab, setTab] = useState<"filter"|"search">("filter");
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => { if(contentRef.current) gsap.fromTo(contentRef.current,{y:8,opacity:0},{y:0,opacity:1,duration:0.3,ease:"power2.out"}); },[tab]);
  return (
    <div className="max-w-xl mx-auto">
      <div className="inline-flex gap-1 bg-[var(--bg-alt)] p-1 rounded-full border border-[var(--border)]">
        <button onClick={()=>setTab("filter")} className="px-6 py-2.5 rounded-full text-sm font-semibold"
          style={{ backgroundColor: tab==="filter"?'var(--primary)':'transparent', color: tab==="filter"?'white':'var(--text-muted)', boxShadow: tab==="filter"?'var(--shadow-md)':'none', transition:'all .3s' }}>
          Product Filter (AJAX)
        </button>
        <button onClick={()=>setTab("search")} className="px-6 py-2.5 rounded-full text-sm font-semibold"
          style={{ backgroundColor: tab==="search"?'var(--primary)':'transparent', color: tab==="search"?'white':'var(--text-muted)', boxShadow: tab==="search"?'var(--shadow-md)':'none', transition:'all .3s' }}>
          Live Search
        </button>
      </div>
      <div ref={contentRef} className="mt-8 bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 text-center">
        {tab==="filter" ? (
          <div>
            <div className="flex gap-2 flex-wrap justify-center mb-6">
              {FILTER_CATEGORIES.map((c,i)=>(<span key={i} className="px-3 py-1.5 rounded-full text-xs font-medium" style={{backgroundColor:`${c.color}20`,color:c.color,border:`1px solid ${c.color}40`}}>{c.icon} {c.label}</span>))}
            </div>
            <p className="text-sm font-medium mb-4">Filtering {CATEGORY_PRODUCTS["T-Shirts"].length} products in real-time</p>
            <a href="https://woo-advanced-filter.beplusthemes.com/shop/" target="_blank" rel="noopener"
              className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-xl font-semibold shadow-lg" style={{background:GRAD}}>
              See Full Demo <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
            </a>
          </div>
        ) : (
          <div>
            <div className="relative max-w-sm mx-auto mb-6">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input placeholder="Search products..." readOnly className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-sm"/>
            </div>
            <div className="space-y-2 max-w-sm mx-auto">
              {CATEGORY_PRODUCTS["Shoes"].slice(0,3).map((p,i)=>(
                <div key={i} className="flex items-center gap-3 bg-[var(--bg-alt)] p-2 rounded-lg text-left">
                  <span className="text-xl">{p.emoji}</span>
                  <div className="flex-1 min-w-0"><div className="text-xs font-semibold truncate">{p.name}</div><div className="text-[10px] text-[var(--text-muted)]">In stock</div></div>
                  <span className="text-xs font-bold text-[var(--primary)] whitespace-nowrap">{p.price}</span>
                </div>
              ))}
            </div>
            <a href="https://woo-advanced-filter.beplusthemes.com/shop/" target="_blank" rel="noopener"
              className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-xl font-semibold shadow-lg mt-6" style={{background:GRAD}}>
              See Full Demo <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── FAQ ───
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef(false);
  useEffect(() => {
    if (!mountRef.current) { mountRef.current = true; return; }
    if (bodyRef.current) {
      if (open) gsap.fromTo(bodyRef.current, { height: 0, opacity: 0 }, { height: "auto", opacity: 1, duration: 0.3, ease: "power2.out" });
      else gsap.to(bodyRef.current, { height: 0, opacity: 0, duration: 0.25, ease: "power2.in" });
    }
  }, [open]);
  return (
    <div className="border-b border-[var(--border)]">
      <button onClick={()=>setOpen(!open)} className="w-full py-5 flex justify-between items-center text-left font-semibold text-sm hover:text-[var(--primary)]" style={{transition:"color .2s"}}>
        {q}
        <span className="text-lg text-[var(--text-muted)]" style={{transform:open?'rotate(45deg)':'rotate(0deg)',transition:'transform .3s'}}>+</span>
      </button>
      <div ref={bodyRef} className="overflow-hidden" style={{height:open?'auto':0,opacity:open?1:0}}>
        <p className="pb-4 text-xs text-[var(--text-muted)] leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

// ─── MAIN ───
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  useEffect(() => { if(headerRef.current) gsap.fromTo(headerRef.current,{y:-80,opacity:0},{y:0,opacity:1,duration:.7,ease:"power3.out"}); }, []);
  const scrollTo = (id:string) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({behavior:"smooth",block:"start"}); };
  const NAV = [{id:"features",label:"Features"},{id:"how",label:"How It Works"},{id:"demo",label:"Demo"},{id:"pricing",label:"Pricing"},{id:"faq",label:"FAQ"}];

  return (
    <main className="overflow-x-hidden">
      {/* HEADER */}
      <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border)]" style={{background:"var(--header-bg)",backdropFilter:"blur(16px)"}}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-extrabold text-sm" style={{background:GRAD}}>B</span>
            <span className="font-extrabold text-xl" style={{background:GRAD,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>Beplus</span>
          </a>
          <nav className="hidden md:flex items-center gap-6">
            {NAV.map(n=>(<button key={n.id} onClick={()=>scrollTo(n.id)} className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text)]" style={{transition:"color .2s"}}>{n.label}</button>))}
            <a href="https://wordpress.org/plugins/beplus-fast-product-filter-live-search-for-woocommerce/" target="_blank" rel="noopener"
              className="text-white px-5 py-2.5 rounded-lg font-semibold text-sm shadow-md" style={{background:GRAD}}>Download Free</a>
          </nav>
          <button className="md:hidden p-1" onClick={()=>setMenuOpen(!menuOpen)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen?<path d="M6 6L18 18M6 18L18 6"/>:<path d="M3 12h18M3 6h18M3 18h18"/>}
            </svg>
          </button>
        </div>
        {menuOpen&&(<nav className="md:hidden px-6 pb-6 space-y-3">{NAV.map(n=>(<button key={n.id} onClick={()=>scrollTo(n.id)} className="block text-sm font-medium py-2 w-full text-left text-[var(--text-muted)]">{n.label}</button>))}</nav>)}
      </header>

      {/* HERO */}
      <section className="min-h-screen flex items-center pt-20 pb-16 bg-[var(--bg)] relative overflow-hidden">
        <div className="absolute inset-0 animated-gradient opacity-[0.03]"/>
        <div className="absolute top-20 -left-20 w-96 h-96 bg-[#7F54B3]/10 rounded-full blur-[100px]"/>
        <div className="absolute bottom-20 -right-20 w-[30rem] h-[30rem] bg-[#2271B1]/8 rounded-full blur-[100px]"/>
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium border border-[var(--border)] bg-[var(--card)] shadow-sm mb-6">
                <span className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse"/> Native Gutenberg Blocks
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.08] mb-6">
                Instant Product<br/>
                <span style={{background:GRAD,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>Filtering & Search</span><br/>
                for WooCommerce
              </h1>
              <p className="text-base sm:text-lg text-[var(--text-muted)] mb-8 max-w-lg leading-relaxed">
                Two native Gutenberg blocks. Zero page refreshes. AJAX-powered results that keep your customers shopping — not waiting.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <GradBtn href="https://woo-advanced-filter.beplusthemes.com/shop/">Try Live Demo <ArrowRight/></GradBtn>
                <a href="https://wordpress.org/plugins/beplus-fast-product-filter-live-search-for-woocommerce/" target="_blank" rel="noopener"
                  className="inline-flex items-center gap-2 border-2 border-[var(--border)] px-6 py-3.5 rounded-xl font-semibold text-[var(--text)] hover:border-[var(--primary)]" style={{transition:"border-color .2s,color .2s"}}>
                  <DownloadIcon/> Download Free
                </a>
              </div>
              <div className="flex gap-5 text-xs text-[var(--text-muted)] flex-wrap">
                <span className="flex items-center gap-1"><span className="text-[var(--accent)]">✓</span> WordPress 6.5+</span>
                <span className="flex items-center gap-1"><span className="text-[var(--accent)]">✓</span> WooCommerce Ready</span>
                <span className="flex items-center gap-1"><span className="text-[var(--accent)]">✓</span> 100% Gutenberg Native</span>
              </div>
            </div>
            <div className="hidden lg:flex justify-end"><HeroMockup/></div>
          </div>
        </div>
      </section>

      {/* PAIN POINTS */}
      <section className="py-16 px-6"><div className="max-w-7xl mx-auto">
        <div className="text-center mb-14"><SectionBadge text="The Problem"/><h2 className="text-3xl md:text-4xl font-extrabold mt-4 mb-4">Your Customers Deserve Better</h2><p className="text-[var(--text-muted)] max-w-lg mx-auto text-sm">Default WooCommerce search is slow and clunky. Here's what's costing you sales.</p></div>
        <div className="grid md:grid-cols-3 gap-6">
          {[{emoji:"⏳",title:"Slow Product Browsing",text:"Default page reloads take 2-4 seconds. Beplus delivers results in under 200ms via AJAX — no full page refresh."},{emoji:"🔍",title:"Poor Search Experience",text:"Default search shows no thumbnails or prices. Beplus Live Search displays everything with typo correction."},{emoji:"💸",title:"Lost Revenue",text:"53% of shoppers abandon the store when search is slow. Instant results keep customers engaged and buying."}].map((p,i)=>(
            <AnimateSection key={i} delay={i*.1} className="group bg-[var(--card)] border border-[var(--border)] rounded-2xl p-7"><div className="text-3xl mb-4">{p.emoji}</div><h3 className="font-bold mb-2 text-sm">{p.title}</h3><p className="text-[var(--text-muted)] text-xs leading-relaxed">{p.text}</p></AnimateSection>
          ))}
        </div>
      </div></section>

      {/* FEATURES */}
      <section id="features" className="py-16 px-6 bg-[var(--bg-alt)]"><div className="max-w-7xl mx-auto">
        <div className="text-center mb-14"><SectionBadge text="Features"/><h2 className="text-3xl md:text-4xl font-extrabold mt-4">Supercharge Product Discovery</h2></div>
        <div className="grid md:grid-cols-3 gap-5">
          {[{icon:"🔍",t:"Live Search Block",d:"Smart autocomplete with thumbnails, prices, and add-to-cart. Typo-tolerant with category filtering."},{icon:"🏷️",t:"8+ Filter Types",d:"Keyword, category, tag, attributes, price range, stock, on-sale, featured, rating — all AJAX powered."},{icon:"⚡",t:"Pre-built Cache",d:"Filter data pre-built and auto-refreshed. Large catalogs stay fast. <200ms response times."},{icon:"🧩",t:"Native Gutenberg",d:"Full InspectorControls and ServerSideRender. Drop anywhere in the Site Editor. Zero code required."},{icon:"🛡️",t:"Graceful Degradation",d:"Without JS, filters fall back to standard GET forms. ARIA, keyboard nav, and live regions built in."},{icon:"🌍",t:"i18n & RTL Ready",d:"Fully internationalized with RTL support. Works seamlessly with any WooCommerce-compatible block theme."}].map((f,i)=>(
            <AnimateSection key={i} delay={i*.06} className="group bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6"><div className="text-2xl mb-3">{f.icon}</div><h3 className="font-bold mb-2 text-sm">{f.t}</h3><p className="text-[var(--text-muted)] text-xs leading-relaxed">{f.d}</p></AnimateSection>
          ))}
        </div>
      </div></section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-16 px-6"><div className="max-w-7xl mx-auto">
        <div className="text-center mb-14"><SectionBadge text="How It Works"/><h2 className="text-3xl md:text-4xl font-extrabold mt-4">Three Steps to a Faster Store</h2><p className="text-[var(--text-muted)] text-sm mt-3 max-w-md mx-auto">Go from zero to instant filtering in under 3 minutes.</p></div>
        <div className="relative max-w-4xl mx-auto">
          <div className="hidden md:block absolute top-[3.75rem] left-[16.7%] right-[16.7%] h-0.5 bg-[var(--border)] z-0"/>
          <div className="grid md:grid-cols-3 gap-0 relative z-10">
            {[{num:"01",icon:"🧱",t:"Drop the Block",d:"Open the Site Editor and drop the filter block above your product grid. No shortcodes, no page builders."},{num:"02",icon:"⚙️",t:"Configure Filters",d:"Pick categories, attributes, and price ranges right from the InspectorControls sidebar."},{num:"03",icon:"🚀",t:"That's It!",d:"Your customers can now filter and search in real time. No page reloads. No lost scroll position."}].map((s,i)=>(
              <AnimateSection key={i} delay={i*.15} className="text-center px-4">
                <div className="w-28 h-28 mx-auto mb-6 bg-[var(--card)] border border-[var(--border)] rounded-2xl flex items-center justify-center text-4xl shadow-sm">{s.icon}</div>
                <div className="text-xs font-extrabold text-[var(--primary)] tracking-widest mb-2">{s.num}</div>
                <h3 className="font-bold text-sm mb-2">{s.t}</h3>
                <p className="text-[var(--text-muted)] text-xs leading-relaxed max-w-[220px] mx-auto">{s.d}</p>
              </AnimateSection>
            ))}
          </div>
        </div>
      </div></section>

      {/* DEMO */}
      <section id="demo" className="py-16 px-6 bg-[var(--bg-alt)]"><div className="max-w-7xl mx-auto text-center">
        <SectionBadge text="Live Demos"/><h2 className="text-3xl md:text-4xl font-extrabold mt-4 mb-12">See It in Action</h2><DemoTabs/>
      </div></section>

      {/* STATS */}
      <section className="py-20 px-6 text-white" style={{background:GRAD}}><div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[{value:"200",suffix:"ms",label:"Response Time"},{value:"8",suffix:"+",label:"Filter Types"},{value:"2",suffix:"",label:"Gutenberg Blocks"},{value:"100",suffix:"%",label:"AJAX Powered"}].map((s,i)=>(
            <div key={i}><div className="text-4xl md:text-5xl font-extrabold mb-1">{s.value}<span className="text-xl opacity-70">{s.suffix}</span></div><div className="text-xs opacity-70 tracking-wide">{s.label}</div></div>
          ))}
        </div>
      </div></section>

      {/* TESTIMONIALS */}
      <section className="py-16 px-6"><div className="max-w-7xl mx-auto">
        <div className="text-center mb-14"><SectionBadge text="Testimonials"/><h2 className="text-3xl md:text-4xl font-extrabold mt-4">Loved by Store Owners</h2></div>
        <div className="grid md:grid-cols-3 gap-6">
          {[{q:"Finally a product filter that actually works with block themes. No more wrestling with shortcodes and page builders.",a:"Sarah L., Store Owner"},{q:"The live search with product thumbnails and add-to-cart boosted my mobile conversions by 18% in the first week.",a:"James K., WooCommerce Developer"},{q:"AJAX filtering is so smooth, my page speed actually improved after switching. Great developer experience.",a:"Maria T., Agency Owner"}].map((t,i)=>(
            <AnimateSection key={i} delay={i*.1} className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-7"><div className="text-4xl text-[var(--accent)] mb-3 leading-none font-serif">"</div><p className="text-sm text-[var(--text)] mb-5 leading-relaxed">{t.q}</p><div className="text-xs text-[var(--text-muted)] font-semibold">{t.a}</div></AnimateSection>
          ))}
        </div>
      </div></section>

      {/* PRICING */}
      <section id="pricing" className="py-16 px-6 bg-[var(--bg-alt)]"><div className="max-w-7xl mx-auto text-center">
        <SectionBadge text="Pricing"/><h2 className="text-3xl md:text-4xl font-extrabold mt-4 mb-12">Simple, Transparent Pricing</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <div className="bg-[var(--card)] border-2 border-[var(--border)] rounded-2xl p-8 text-left">
            <h3 className="text-lg font-bold mb-2">Free Core</h3>
            <div className="text-4xl font-extrabold mb-6">$0 <span className="text-sm font-normal text-[var(--text-muted)]">/ forever</span></div>
            <ul className="space-y-3 mb-8">{["2 Gutenberg blocks","8+ filter types","AJAX live search","Typo tolerance","ARIA accessibility","i18n ready"].map(l=>(<li key={l} className="flex items-center gap-2 text-xs"><span className="text-[var(--accent)]">✓</span> {l}</li>))}</ul>
            <a href="https://wordpress.org/plugins/beplus-fast-product-filter-live-search-for-woocommerce/" target="_blank" rel="noopener"
              className="block text-center text-white py-3 rounded-xl font-semibold text-sm shadow-md" style={{background:GRAD}}>Download Free</a>
          </div>
          <div className="bg-[var(--card)] border-2 border-[var(--primary)]/30 rounded-2xl p-8 text-left relative">
            <span className="absolute -top-3 right-6 bg-[var(--primary)] text-white text-[10px] font-semibold px-3 py-1 rounded-full">Coming Soon</span>
            <h3 className="text-lg font-bold mb-2">Pro</h3><div className="text-2xl font-extrabold mb-6 text-[var(--text-muted)]">Coming Soon</div>
            <ul className="space-y-3 mb-8">{["Everything in Free","Premium analytics","Custom filter styling","Priority support","Advanced caching","Premium integrations"].map(l=>(<li key={l} className="flex items-center gap-2 text-xs"><span className="text-[var(--accent)]">✓</span> {l}</li>))}</ul>
            <button className="block w-full text-center border-2 border-[var(--border)] py-3 rounded-xl font-semibold text-sm text-[var(--text-muted)] cursor-default">Join Waitlist</button>
          </div>
        </div>
      </div></section>

      {/* FAQ */}
      <section id="faq" className="py-16 px-6"><div className="max-w-2xl mx-auto">
        <div className="text-center mb-12"><SectionBadge text="FAQ"/><h2 className="text-3xl md:text-4xl font-extrabold mt-4">Frequently Asked Questions</h2></div>
        {[["Does this work with block themes?","Yes! Native Gutenberg blocks designed for block themes and FSE. Fully compatible with Twenty Twenty-Five and other modern WordPress themes."],["Can I use only one of the blocks?","Absolutely. Use the filter panel on your shop page, the live search in your header, or both. They work together or independently."],["Does it support custom taxonomies?","Yes! Expose any custom product taxonomy as a filter — Brand, Material, Season, or your own custom taxonomies."],["Will this slow down my store?","No — it often improves perceived speed. Pre-built cache with auto-refresh keeps AJAX responses under 200ms."],["Can I customize the look and feel?","Yes. The blocks respect your theme styles and include block settings for accent colors, layout, and more. CSS hooks available."],["Does it work with page builders?","Built as native Gutenberg blocks. Works with any builder that supports WordPress blocks. Best experience with FSE block themes."],["Is WooCommerce required?","Yes. Both blocks require WooCommerce to be active with products. Filter and search data come from WooCommerce."],["Does it support variable products?","Yes. Variable and grouped products are fully supported with price ranges and proper filter handling."]].map(([q,a],i)=><FaqItem key={i} q={q} a={a}/>)}
      </div></section>

      {/* CTA */}
      <section className="py-16 px-6 bg-gradient-to-b from-[var(--bg)] to-[var(--bg-alt)] text-center"><div className="max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Give Your Customers the Search Experience They Deserve</h2>
        <p className="text-[var(--text-muted)] text-sm mb-8">Free, open-source, and takes 3 minutes to set up.</p>
        <a href="https://wordpress.org/plugins/beplus-fast-product-filter-live-search-for-woocommerce/" target="_blank" rel="noopener"
          className="inline-flex items-center gap-2 text-white px-8 py-4 rounded-xl font-semibold text-base shadow-xl" style={{background:GRAD}}>
          <DownloadIcon/> Download on WordPress.org
        </a>
        <p className="mt-5 text-xs text-[var(--text-muted)]">WordPress 6.5+ · WooCommerce Ready · 100% Gutenberg Native</p>
      </div></section>

      {/* FOOTER */}
      <footer className="border-t border-[var(--border)] py-8 px-6"><div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-4 text-xs text-[var(--text-muted)]">
        <span className="flex items-center gap-2 font-extrabold text-sm" style={{background:GRAD,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>⚡ Beplus</span>
        <span>© 2026 Beplus · <a href="https://wordpress.org/plugins/beplus-fast-product-filter-live-search-for-woocommerce/" target="_blank" rel="noopener" className="text-[var(--primary)] hover:underline">Plugin on WordPress.org</a></span>
      </div></footer>
    </main>
  );
}

function ArrowRight() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>; }
function DownloadIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>; }
