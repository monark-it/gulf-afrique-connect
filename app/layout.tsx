import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "../index.css";
import ClientLayout from "@/components/ClientLayout";
import ClientOnlyToaster from "@/components/ClientOnlyToaster";

export const metadata: Metadata = {
  title: "ResearchGuide - The Bridge of Scientific Excellence",
  description:
    "Access elite R&D talent and strategic expertise through a verified corridor, aligned with Qatar's National Vision 2030.",
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="gtm-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WFF9HZHZ');`,
          }}
        />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WFF9HZHZ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <ClientLayout>
          {children}
          <ClientOnlyToaster />
        </ClientLayout>
      </body>
    </html>
  );
}