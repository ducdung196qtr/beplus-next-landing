import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Beplus — Instant Product Filter & Live Search for WooCommerce",
  description: "Two native Gutenberg blocks. Zero page refreshes. AJAX-powered filtering and live search for WooCommerce.",
  openGraph: {
    title: "Beplus — Instant Product Filter & Live Search for WooCommerce",
    description: "Two native Gutenberg blocks. Zero page refreshes. AJAX-powered filtering.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-[#1E1E1E] font-sans antialiased">{children}</body>
    </html>
  );
}
