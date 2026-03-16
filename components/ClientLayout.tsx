'use client';
import { ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { I18nextProvider } from 'react-i18next';
import { Toaster } from 'sonner';         
import { Toaster as HotToaster } from 'react-hot-toast';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import i18n from '@/i18n';

export default function ClientLayout({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: { staleTime: 60 * 1000, gcTime: 5 * 60 * 1000 },
    },
  }));

  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        <QueryClientProvider client={queryClient}>
          <I18nextProvider i18n={i18n}>
            {children}
            <Toaster position="top-center" />
            <HotToaster position="top-right" />
          </I18nextProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </GoogleReCaptchaProvider>
  );
}