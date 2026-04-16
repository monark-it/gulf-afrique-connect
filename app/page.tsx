'use client';
import { useTranslation } from "react-i18next";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import AboutSection from "@/components/landing/AboutSection";
import ProblemSection from "@/components/landing/ProblemSection";
import ServicesSection from "@/components/landing/ServicesSection";
import ProcessSection from "@/components/landing/ProcessSection";
import AdvantagesSection from "@/components/landing/AdvantagesSection";
import FAQSection from "@/components/landing/FAQSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";
import AboutHistorySection from "@/components/landing/AboutHistorySection ";

const Index = () => {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  return (
    <div className="min-h-screen" dir={isRtl ? "rtl" : "ltr"}>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProblemSection />
      <ServicesSection />
      <AdvantagesSection />
      <ProcessSection />
      <FAQSection />
      <CTASection />
      <AboutHistorySection />
      <Footer />
    </div>
  );
};

export default Index;