"use client";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.5 } }),
};

const ProblemSection = () => {
  const { t } = useTranslation();
  const challenges = t("problem.challenges", { returnObjects: true }) as string[];
  const solutions = t("problem.solutions", { returnObjects: true }) as string[];

  return (
    <section className="py-24 bg-section-alt" id="the-challenge">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
              className="text-primary font-body text-sm font-semibold tracking-[0.15em] uppercase mb-3">
              {t("problem.challengeLabel")}
            </motion.p>
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp}
              className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">
              {t("problem.challengeTitle")}
            </motion.h2>
            <div className="space-y-5">
              {challenges.map((c, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i + 2} variants={fadeUp}
                  className="flex gap-4 p-5 rounded-xl bg-card border border-border shadow-purple">
                  <AlertTriangle size={22} className="text-primary mt-0.5 shrink-0" />
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{c}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
              className="text-secondary font-body text-sm font-semibold tracking-[0.15em] uppercase mb-3">
              {t("problem.solutionLabel")}
            </motion.p>
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp}
              className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">
              {t("problem.solutionTitle")}
            </motion.h2>
            <div className="space-y-5">
              {solutions.map((s, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i + 2} variants={fadeUp}
                  className="flex gap-4 p-5 rounded-xl bg-card border border-primary/20 shadow-orange">
                  <CheckCircle2 size={22} className="text-primary mt-0.5 shrink-0" />
                  <p className="font-body text-sm text-foreground leading-relaxed">{s}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
