"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import ExpertFormDialog from "./ExpertFormDialog";



const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();

  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <a href="#" className="font-display text-xl font-bold text-foreground tracking-wide">
          Research<span className="text-primary">Guide</span>
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm font-body text-muted-foreground">
          <a href="#about" className="hover:text-primary transition-colors">{t("nav.about")}</a>
          <a href="#services" className="hover:text-primary transition-colors">{t("nav.services")}</a>
          <a href="#advantages" className="hover:text-primary transition-colors">{t("nav.advantages")}</a>
          <a href="#process" className="hover:text-primary transition-colors">{t("nav.process")}</a>
          <a href="#faq" className="hover:text-primary transition-colors">{t("nav.faq")}</a>
        </div>

       
           <div className="hidden md:flex items-center gap-3">
  
        {/* Bouton CTA */}
        <button
          onClick={() => {
            const section = document.getElementById("cta");
            section?.scrollIntoView({ behavior: "smooth" });
          }}
          className="px-5 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-orange-light transition-colors"
        >
          {t("nav.findExpert")}
        </button>
      </div>
      
             
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-lg overflow-hidden"
          >
            <div className="flex flex-col gap-4 p-6 text-muted-foreground font-body text-sm">
              <a href="#about" onClick={() => setOpen(false)} className="hover:text-primary transition-colors">{t("nav.about")}</a>
              <a href="#services" onClick={() => setOpen(false)} className="hover:text-primary transition-colors">{t("nav.services")}</a>
              <a href="#process" onClick={() => setOpen(false)} className="hover:text-primary transition-colors">{t("nav.process")}</a>
              <a href="#advantages" onClick={() => setOpen(false)} className="hover:text-primary transition-colors">{t("nav.advantages")}</a>
              <a href="#faq" onClick={() => setOpen(false)} className="hover:text-primary transition-colors">{t("nav.faq")}</a>
              <ExpertFormDialog type="client">
                <button onClick={() => setOpen(false)} className="mt-2 px-5 py-2 text-center text-sm font-medium rounded-md bg-primary text-primary-foreground">
                  {t("nav.findExpert")}
                </button>
              </ExpertFormDialog>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;