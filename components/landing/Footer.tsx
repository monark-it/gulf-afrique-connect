"use client";
import { Building2, Phone, Mail, MapPin, FlaskConical, Space } from "lucide-react";
import Image from "next/image";


const FooterSection = () => {
  return (
    <footer className="border-t border-white/10 bg-purple-deep py-10 px-10 w-full text-white">

      <div className="w-full flex flex-col md:flex-row justify-between items-start gap-10">

        {/* LEFT : Brand + Services */}
        <div className="flex flex-col gap-2">
          <a href="#" className="flex items-center">
            <Image 
              src="/Logo ResearchGuide.svg" 
              alt="ResearchGuide" 
              width={140} 
              height={32} 
              priority
              className="brightness-0 invert" 
            />
          </a>
          <p className="mt-1 text-sm text-white/60">
            Where Research Meets Opportunities
          </p>

          <div className="mt-4 flex flex-wrap gap-x-2 gap-y-2 text-xs text-white/60 max-w-md">
            <span>Innovation consulting services</span><span>·</span>
            <span>R&D consulting</span><span>·</span>
            <span>R&D outsourcing</span>
            <span>Artificial intelligence experts</span><span>·</span>
            <span>Renewable energy consultant</span>
            <span>Scientific research methods</span><span>·</span>
            <span>AI tools for academic research</span>
            <span>Professional engineering consulting</span><span>·</span>
            <span>Technology consulting firm</span>
            <span>Research and development services</span><span>.</span>
            <span>professional engineering consulting</span>
            <span>Research monitoring</span><span>.</span>
            <span>Journal ranking system</span><span>.</span>
            <span>Research assistance</span>
            <span>Research methodology</span><span>.</span>
            <span>Data collection</span><span>.</span>
            <span>Digital health</span>
            <span>Earth sciences</span>
            <span>Renewable energy consultant</span><span>.</span>
            <span>Open access journals</span>
            <span>Innovation consulting services</span><span>.</span>
            <span>Applied physics</span><span>.</span>
            <span>tech scouting</span>
            <span>Virtual research environment</span><span>.</span>
            <span>Tech scouting</span><span>.</span>
            <span>R&D operations</span>
            
          </div>
        </div>

        {/* CENTER : Quick Links */}
        <div className="text-center md:text-left pt-7 min-w-[200px]">
          <p className="text-white font-semibold mb-3 text-lg">Quick Links</p>
          <ul className="space-y-2 text-sm text-white/70">
            <li><a href="#about" className="hover:text-white">About Us</a></li>
            <li><a href="#hybrid-model" className="hover:text-white">Introduction</a></li>
            <li><a href="#the-challenge" className="hover:text-white">The Challenge</a></li>
            <li><a href="#the-challenge" className="hover:text-white">The Solution</a></li>
            <li><a href="#services" className="hover:text-white">Our Services</a></li>
            <li><a href="#advantages" className="hover:text-white">Value Proposition</a></li>
            <li><a href="#process" className="hover:text-white">The "Vetted" Label</a></li>
            <li><a href="#faq" className="hover:text-white">FAQ</a></li>
          
            <li>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent("open-form", { detail: "client" }))}
                className="hover:text-white"
              >
                Find Experts
              </button>
            </li>
            <li>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent("open-form", { detail: "talent" }))}
                className="hover:text-white"
              >
                Showcase Yourself
              </button>
            </li>
          </ul>
        </div>

        {/* RIGHT : Contact Info */}
        <div className="flex flex-col gap-3 text-base text-white/70 pt-7">

          <p className="text-white font-semibold mb-2 text-lg">Contact Us</p>

          {/* Company */}
          <div className="flex items-start gap-2">
            <Building2 className="w-5 h-5 mt-1 text-orange-500 flex-shrink-0" />
            <span className="text-white/80">MONARK IT LLC</span>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-2">
            <Phone className="w-5 h-5 mt-1 text-orange-500 flex-shrink-0" />
            <span className="text-white/80">+974 3383 7805</span>
          </div>

          {/* Email */}
          <div className="flex items-start gap-2">
            <Mail className="w-5 h-5 mt-1 text-orange-500 flex-shrink-0" />
            <span className="text-white/80">contact@researchguide.net</span>
          </div>

          {/* Headquarters */}
          <p className="text-xs text-white/40 uppercase tracking-widest mt-1">Headquarters</p>
          <div className="flex items-start gap-2">
            <MapPin className="w-5 h-5 mt-1 text-orange-500 flex-shrink-0" />
            <a
              href="https://maps.app.goo.gl/FvFtdNMDUcdWmsWd6"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-orange-400 transition-colors underline underline-offset-2"
            >
              Unit 210-88, 2nd Floor, Tech 2 Building, QSTP, Doha - Qatar
            </a>
          </div>

          {/* Branch Offices */}
          <p className="text-xs text-white/40 uppercase tracking-widest mt-3">Branch Offices</p>
          <div className="pl-3 border-l-2 border-white/10 flex flex-col gap-2">

            {/* Branch Office 1 */}
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-1 text-orange-500/60 flex-shrink-0" />
              <a
                href="https://maps.app.goo.gl/BKYwJ66qBWtWyENg8"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 text-sm hover:text-orange-400 transition-all underline underline-offset-2"
              >
                Office 18, 5th Floor, Bergis Business Center, Av. My Abdellah, Marrakesh - Morocco
              </a>
            </div>

            {/* Branch Office 2 */}
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-1 text-orange-500/60 flex-shrink-0" />
              <a
                href="https://maps.app.goo.gl/xksoJyDuF1Smvw6P7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 text-sm hover:text-orange-400 transition-all underline underline-offset-2"
              >
                23 Arset Qortobi, 1st Floor, Marrakesh - Morocco
              </a>
            </div>

          </div>

        </div>

      </div>

      {/* Bottom */}
      <div className="mt-8 border-t border-white/10 pt-4 text-center">
        <p className="text-xs text-white/50">
          © {new Date().getFullYear()} ResearchGuide — MONARK IT LLC. All rights reserved.
        </p>
      </div>

    </footer>
  );
};

export default FooterSection;