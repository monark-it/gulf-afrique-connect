"use client";
import { useState, useRef } from "react";
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

const ExpertFormDialog = ({ type, children }: ExpertFormDialogProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", organization: "", message: "" });
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.organization.trim() || !form.message.trim()) {
      toast.error(t("form.errorRequired"));
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast.error(t("form.errorEmail"));
      return;
    }

    if (!executeRecaptcha) {
      toast.error("reCAPTCHA not ready");
      return;
    }
    const recaptchaToken = await executeRecaptcha("submit_form");

    setLoading(true);
    try {
      const response = await fetch("/api/forms/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          name: form.name,
          email: form.email,
          organization: form.organization,
          message: form.message,
          recaptchaToken,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        toast.error(error.error || "Failed to submit form");
        return;
      }

      toast.success(type === "client" ? t("form.successClient") : t("form.successTalent"));
      setForm({ name: "", email: "", organization: "", message: "" });
      setOpen(false);
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const modal = open ? (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-[9998]"
        onClick={() => setOpen(false)}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] w-[90%] max-w-md bg-background border border-border rounded-2xl p-6 shadow-xl overflow-y-auto max-h-[90vh]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl text-foreground">
            {type === "client" ? t("form.clientTitle") : t("form.talentTitle")}
          </h2>
          <button
            onClick={() => setOpen(false)}
            className="text-muted-foreground hover:text-foreground transition-colors text-xl leading-none"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div>
            <label className="font-body text-sm text-muted-foreground mb-1 block">
              {t("form.name")} <span className="text-primary">{t("form.required")}</span>
            </label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder={type === "client" ? t("form.namePlaceholderClient") : t("form.namePlaceholderTalent")}
              maxLength={100}
              required
            />
          </div>
          <div>
            <label className="font-body text-sm text-muted-foreground mb-1 block">
              {t("form.email")} <span className="text-primary">{t("form.required")}</span>
            </label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder={t("form.emailPlaceholder")}
              maxLength={255}
              required
            />
          </div>
          <div>
            <label className="font-body text-sm text-muted-foreground mb-1 block">
              {type === "client" ? t("form.orgLabel") : t("form.orgLabelTalent")}{" "}
              <span className="text-primary">{t("form.required")}</span>
            </label>
            <Input
              value={form.organization}
              onChange={(e) => setForm({ ...form, organization: e.target.value })}
              placeholder={type === "client" ? t("form.orgPlaceholderClient") : t("form.orgPlaceholderTalent")}
              maxLength={150}
              required
            />
          </div>
          <div>
            <label className="font-body text-sm text-muted-foreground mb-1 block">
              {type === "client" ? t("form.messageClient") : t("form.messageTalent")}{" "}
              <span className="text-primary">{t("form.required")}</span>
            </label>
            <Textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder={type === "client" ? t("form.messagePlaceholderClient") : t("form.messagePlaceholderTalent")}
              maxLength={1000}
              rows={3}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-body font-semibold text-sm hover:bg-orange-light transition-colors shadow-orange disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading
              ? "Sending..."
              : type === "client"
              ? t("form.submitClient")
              : t("form.submitTalent")}
          </button>
        </form>
      </div>
    </>
  ) : null;

  return (
    <>
      {/* Trigger */}
      <span onClick={() => setOpen(true)} style={{ cursor: "pointer" }}>
        {children}
      </span>

      {/* Portal: renders modal at document.body level */}
      {typeof window !== "undefined" && modal
        ? createPortal(modal, document.body)
        : null}
    </>
  );
};

export default ExpertFormDialog;