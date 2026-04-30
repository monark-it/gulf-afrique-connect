"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const journeyImage = "/images/IMG_5974.jpg";
const timelineEvents = [
  {
    year: "2012",
    title: "The Spark",
    description:
      "Salim El Bouanani, CEO of MONARK IT, a software development agency, identified a significant challenge: many ambitious software projects in Europe and North America demanded high-value contributions, yet it was rare to find professionals who combined both technical expertise and creative vision. Leveraging his own experience as a PhD and collaborating with other PhD consultants and experienced engineers, he set out to bridge this gap.",
  },
  {
    year: "2012–2020",
    title: "The Growth",
    description:
      "MONARK IT established robust processes and built a strong network of experts to meet this demand. Over these years, a seed was planted — growing into a trusted network of European and North American partnerships, founded on technical excellence, geographical proximity, and an unmatched quality-to-cost ratio.",
  },
  {
    year: "2020–2025",
    title: "The Engine",
    description:
      "At the beginning of 2025, MONARK IT L.L.C was officially established in Qatar. By that time, the seed had grown into the comprehensive platform ResearchGuide.net, providing pre-project consulting, dedicated R&D teams, post-project support, and AI integration — all powered by 20 passionate experts transforming complexity into clarity. The journey also gained international recognition at Web Summit.",
  },
  {
    year: "2026",
    title: "The Incubation",
    description:
      " In 2026, the platform ResearchGuide.net was incubated at QSTP. Leveraging strong international expertise, it connects organizations with vetted researchers and on-demand experts, accelerating innovation and enabling measurable impact, particularly supporting R&D in the technology sector.",
  },
];

const OurJourney = () => {
  const [visibleCount, setVisibleCount] = useState(0);
  return (
    <section id="about-us" className="bg-background py-20 px-4 md:px-8" >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            Our Journey
          </h2>
          {/* Texte ResearchGuide */}
          <p className="text-muted-foreground md:text-lg leading-relaxed max-w-4xl mx-auto bg-white/20 p-6 rounded-2xl shadow-md">
            Our flagship platform, 
            <span className="font-semibold">
              <span className="text-black">Research</span>
              <span className="text-orange-500">Guide</span>
            </span>, 
            exemplifies this vision: connecting organizations in Qatar and beyond with highly vetted PhDs, researchers, and on-demand experts.
            <br /><br />
            By removing hiring hurdles and bridging the gap between talent and innovation, 
            <span className="font-semibold">
              <span className="text-black">Research</span>
              <span className="text-orange-500">Guide</span>
            </span> accelerates progress and enables organizations to achieve their goals efficiently.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Timeline */}
          <div className="relative pl-8 flex flex-col justify-start order-2 lg:order-1">
            <div className="absolute left-3 top-0 bottom-0 w-1 bg-orange-200/50 rounded" />
            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  onViewportEnter={() => setVisibleCount(prev => Math.max(prev, index + 1))} // 👈
                  className="relative pl-6 group"
                >
                  <div className="absolute -left-5 top-1 w-5 h-5 rounded-full bg-orange-500 border-2 border-white shadow-lg group-hover:scale-125 transition-transform duration-300" />
                  <span className="inline-block text-xs font-bold tracking-widest uppercase text-orange-500 mb-1">
                    📌 {event.year}
                  </span>
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-2 group-hover:text-orange-500 transition-colors duration-300">
                    {event.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base text-justify">
                    {event.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="flex justify-center items-start order-1 lg:order-2 relative">
            <div className="rounded-2xl shadow-xl overflow-hidden w-[750px] h-[900px] hover:scale-105 transition-transform duration-500">
              <img
                src={journeyImage}
                alt="MONARK IT team collaborating in a modern office"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Caption / Indication */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white text-[20px] px-1  py-1 rounded-md text-center w-[550px]">
              Photo taken at Web Summit Qatar 2026 — Mr. Salim El Bouanani (CEO) & Mr. Abdelhak Sabri (Sales Director)
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurJourney;