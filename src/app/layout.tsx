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
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){var t=localStorage.getItem('theme');document.documentElement.classList.toggle('dark',t!=='light')})()
        `}} />
      </head>
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
