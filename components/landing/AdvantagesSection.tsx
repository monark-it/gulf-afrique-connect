"use client";
import { motion } from "framer-motion";
import { BadgeCheck, ShieldCheck, Clock, Languages, Telescope } from "lucide-react";
import { useTranslation } from "react-i18next";

const icons = [BadgeCheck, ShieldCheck, Clock, Languages, Telescope];



const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const AdvantagesSection = () => {
  const { t } = useTranslation();
  const items = t("advantages.items", { returnObjects: true }) as { title: string; desc: string }[];

  return (
    <section id="advantages" className="py-24">
      <div className="container mx-auto px-4">
        <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
          className="text-primary font-body text-sm font-semibold tracking-[0.15em] uppercase mb-3 text-center">
          {t("advantages.label")}
        </motion.p>
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp}
          className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-16">
          {t("advantages.title")}
        </motion.h2>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {items.slice(0, 3).map((a, i) => {
            const Icon = icons[i];
            return (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i + 2} variants={fadeUp}
                className="p-6 rounded-2xl border border-border bg-card hover:shadow-orange transition-shadow duration-300">
                <Icon size={28} className="text-primary mb-4" />
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{a.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{a.desc}</p>
              </motion.div>
            );
          })}
        </div>
        
        <div className="flex flex-col md:flex-row justify-center gap-6 max-w-5xl mx-auto mt-6">
          {items.slice(3).map((a, i) => {
            const Icon = icons[i + 3];
            return (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i + 5} variants={fadeUp}
                className="p-6 rounded-2xl border border-border bg-card hover:shadow-orange transition-shadow duration-300 w-full md:w-[calc(33.333%-12px)]">
                <Icon size={28} className="text-primary mb-4" />
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{a.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{a.desc}</p>
              </motion.div>
            );
          })}
        </div>

        

      </div>
    </section>
  );
};

export default AdvantagesSection;