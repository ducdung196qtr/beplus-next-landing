import type { Metadata } from "next";
import { ThemeProvider } from "../components/ThemeProvider";
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark');}})()
        `}} />
      </head>
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
