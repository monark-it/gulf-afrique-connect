"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ExpertFormDialogProps {
  type: "client" | "talent";
  children: React.ReactNode;
}

// Global modal state — un seul modal à la fois
let globalSetOpen: ((type: "client" | "talent" | null) => void) | null = null;

export const openExpertForm = (type: "client" | "talent") => {
  globalSetOpen?.(type);
};

// Singleton modal — à monter une seule fois dans le layout
export const ExpertFormModal = () => {
  const [activeType, setActiveType] = useState<"client" | "talent" | null>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", organization: "", address: "", message: "" });
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { t } = useTranslation();
  const [recaptchaReady, setRecaptchaReady] = useState(false);

  useEffect(() => {
    globalSetOpen = setActiveType;
    return () => { globalSetOpen = null; };
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const custom = e as CustomEvent;
      if (custom.detail === "client" || custom.detail === "talent") {
        setActiveType(custom.detail);
      }
    };
    window.addEventListener("open-form", handler);
    return () => window.removeEventListener("open-form", handler);
  }, []);

  useEffect(() => {
    if (executeRecaptcha) setRecaptchaReady(true);
  }, [executeRecaptcha]);

  const close = () => setActiveType(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recaptchaReady || !activeType) return;
    if (!form.name.trim() || !form.email.trim() || !form.organization.trim() || !form.message.trim()) {
      toast.error(t("form.errorRequired")); return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast.error(t("form.errorEmail")); return;
    }
    const recaptchaToken = await executeRecaptcha!("submit_form");
    setLoading(true);
    try {
      const response = await fetch("/api/forms/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: activeType, ...form, recaptchaToken, source: "LP-Experts" }),
      });
      if (!response.ok) { toast.error("Failed to submit form"); return; }
      toast.success(activeType === "client" ? t("form.successClient") : t("form.successTalent"));
      setForm({ name: "", email: "", organization: "", address: "", message: "" });
      close();
    } catch { toast.error("An error occurred. Please try again."); }
    finally { setLoading(false); }
  };

  if (!activeType) return null;

  return createPortal(
    <>
      <div className="fixed inset-0 bg-black/50 z-[9998]" onClick={close} />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] w-[90%] max-w-md bg-background border border-border rounded-2xl p-6 shadow-xl overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl text-foreground">
            {activeType === "client" ? t("form.clientTitle") : t("form.talentTitle")}
          </h2>
          <button onClick={close} className="text-muted-foreground hover:text-foreground text-xl leading-none">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          {[
            { key: "name", label: t("form.name"), placeholder: activeType === "client" ? t("form.namePlaceholderClient") : t("form.namePlaceholderTalent"), required: true },
            { key: "email", label: t("form.email"), placeholder: t("form.emailPlaceholder"), type: "email", required: true },
            { key: "organization", label: activeType === "client" ? t("form.orgLabel") : t("form.orgLabelTalent"), placeholder: activeType === "client" ? t("form.orgPlaceholderClient") : t("form.orgPlaceholderTalent"), required: true },
            { key: "address", label: t("form.address"), placeholder: t("form.addressPlaceholder"), required: false },
          ].map((f) => (
            <div key={f.key}>
              <label className="font-body text-sm text-muted-foreground mb-1 block">
                {f.label} {f.required && <span className="text-primary">{t("form.required")}</span>}
              </label>
              <Input type={f.type || "text"} value={form[f.key as keyof typeof form]}
                onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                placeholder={f.placeholder} maxLength={255} required={f.required} />
            </div>
          ))}
          <div>
            <label className="font-body text-sm text-muted-foreground mb-1 block">
              {activeType === "client" ? t("form.messageClient") : t("form.messageTalent")}{" "}
              <span className="text-primary">{t("form.required")}</span>
            </label>
            <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder={activeType === "client" ? t("form.messagePlaceholderClient") : t("form.messagePlaceholderTalent")}
              maxLength={1000} rows={3} required />
          </div>
          <button type="submit" disabled={!recaptchaReady || loading}
            className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-body font-semibold text-sm hover:bg-orange-light transition-colors shadow-orange disabled:opacity-70">
            {loading ? "Sending..." : activeType === "client" ? t("form.submitClient") : t("form.submitTalent")}
          </button>
        </form>
      </div>
    </>,
    document.body
  );
};

// Trigger wrapper — inchangé
const ExpertFormDialog = ({ type, children }: ExpertFormDialogProps) => (
  <span onClick={(e) => { e.stopPropagation(); openExpertForm(type); }} style={{ cursor: "pointer" }}>
    {children}
  </span>
);

export default ExpertFormDialog;