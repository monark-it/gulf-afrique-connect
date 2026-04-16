"use client";
import { motion } from "framer-motion";
import { Building2, Lightbulb, Code2, Globe2 } from "lucide-react";


export default function AboutUsSection() {
  return (
    <section id="roots" className="py-24 bg-muted/50 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-brand-accent/5 blur-3xl" />
        <div className="absolute bottom-0 -left-24 w-[400px] h-[400px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-orange font-semibold text-sm uppercase tracking-wider mb-3">
            Our Roots
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-5">
            Built by Builders Who Believe in Science
          </h2>
          
        </motion.div>

        {/* Monarkit card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-[0_4px_40px_rgba(139,92,246,0.15)] mb-12 flex flex-col md:flex-row gap-8 items-start"
        >
          {/* Logo placeholder */}
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-2xl bg-purple-700 flex items-center justify-center shadow-sm overflow-hidden">
              <img
                src="/images/Favicon MONARK IT WHITE.svg"
                alt="MONARK IT"
                className="w-full h-full object-contain p-2"
              />
            </div>
          </div>

          



          <div>
            <h2 className="text-l md:text-xl font-bold text-foreground mb-2">
            From Vision to Innovation
          </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              ResearchGuide is Monark IT’s flagship platform, created under the leadership of Dr. Salim El Bouanani, CEO of MONARK IT and PhD holder. Built on years of experience in delivering high-impact software and developing global expert networks, it combines AI orchestration with smart matchmaking to connect organizations with trusted researchers and R&D talent. Today, ResearchGuide transforms fragmented processes into a seamless system, helping teams move from idea to impact faster.
            </p>
            
          </div>
        </motion.div>

       
      </div>
    </section>
  );
}