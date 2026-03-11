import type { Metadata, Viewport } from "next";
import { Toaster } from "sonner";
import "../index.css";
import ClientLayout from "@/components/ClientLayout";
import ClientOnlyToaster from "@/components/ClientOnlyToaster";

export const metadata: Metadata = {
  title: "ResearchGuide - The Bridge of Scientific Excellence",
  description:
    "Access elite R&D talent and strategic expertise through a verified corridor, aligned with Qatar's National Vision 2030.",

  icons: { icon: "/favicon.svg" }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ClientLayout>
          {children}
          <ClientOnlyToaster />
        </ClientLayout>
      </body>
    </html>
  );
}
