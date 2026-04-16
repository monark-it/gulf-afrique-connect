"use client";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Users, Lightbulb, ArrowLeft} from "lucide-react";
import { useTranslation } from "react-i18next";
import ExpertFormDialog from "./ExpertFormDialog";

import { useState, useEffect, useRef } from "react";

const CountUp = ({ end, duration = 2000 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, end, duration]);

  return <span ref={ref}>{count}</span>;
};


const icons = [Users, Lightbulb, Shield];

const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const highlights = [
    { icon: icons[0], text: t("hero.h1") },
    { icon: icons[1], text: t("hero.h2") },
    { icon: icons[2], text: t("hero.h3") },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('/hero-bg.jpg')` }} 
 />
      <div className="absolute inset-0 bg-hero opacity-85" />

      <div className="relative container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-3xl">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-primary font-body text-sm font-semibold tracking-[0.2em] uppercase mb-6">
            {t("hero.badge")}
          </motion.p>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            {t("hero.title")}
            <span className="text-gradient-orange">{" "}{t("hero.titleHighlight")}</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="font-body text-lg md:text-xl text-white/70 leading-relaxed mb-10 max-w-2xl">
            {t("hero.subtitle")}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
            className="flex flex-col sm:flex-row gap-4 mb-14">
            <ExpertFormDialog type="client">
               <button className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-primary text-primary-foreground font-body font-semibold text-sm hover:bg-orange-light transition-colors shadow-orange">
                {t("hero.btnClient")}{" "}
                {isRTL ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
              </button>
            </ExpertFormDialog>
            <ExpertFormDialog type="talent">
              <button className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg border border-white/30 text-white font-body font-semibold text-sm hover:border-primary hover:text-primary transition-colors">
                {t("hero.btnTalent")}
              </button>
            </ExpertFormDialog>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}
            className="flex flex-wrap gap-6">
            {highlights.map((h, i) => (
              <div key={i} className="flex items-center gap-2.5 text-white/60 font-body text-sm">
                <h.icon size={18} className="text-primary" />
                <span>{h.text}</span>
              </div>
            ))}
          </motion.div>
        </div>

         <motion.div
    initial={{ opacity: 0, x: 30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.9 }}
    className="hidden lg:flex flex-col gap-8 absolute right-8 top-1/2 -translate-y-1/2 text-left"
  >
    {[
  { value: 2000, prefix: "+", label: "Experts" },
  { value: 100, prefix: "+", label: "Universities" },
  { value: 50, prefix: "+", label: "Companies" },
].map((stat, i) => (
  <div key={i} className="flex flex-col">
    <span className="text-4xl font-black text-primary">
      {stat.prefix}<CountUp end={stat.value} duration={2000} />
    </span>
    <span className="text-white/60 text-xs uppercase tracking-widest mt-1">{stat.label}</span>
  </div>
))}
  </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
