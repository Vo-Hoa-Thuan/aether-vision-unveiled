import { useState } from "react";
import { useTranslation } from "@/lib/i18n";
import { motion, AnimatePresence } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, ArrowRight, Loader2 } from "lucide-react";
import { submitToWebhook } from "@/lib/webhook";
import { trackEvent } from "@/lib/webhook";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(80),
  email: z.string().trim().email("Enter a valid email").max(255),
  consent: z.literal(true, { message: "Please accept to subscribe" }),
});

type FormData = z.infer<typeof schema>;

export function Newsletter() {
  const { t, language } = useTranslation();
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", consent: false as unknown as true },
  });

  async function onSubmit(data: FormData) {
    setSubmitting(true);
    trackEvent({ type: "form_interact", target: "newsletter_submit", metadata: { email: data.email } });

    let success = false;

    // Feature 4: Newsletter Backend with Supabase
    if (supabase) {
      try {
        const { error } = await supabase
          .from('newsletter')
          .insert([{ name: data.name, email: data.email }]);
          
        if (error) {
          // Handle unique constraint violation (duplicate email)
          if (error.code === '23505') {
            toast.error(language === 'vi' ? 'Email này đã được đăng ký!' : 'This email is already subscribed!');
            setSubmitting(false);
            return;
          }
          throw error;
        }
        success = true;
      } catch (err) {
        console.error("Supabase insert error:", err);
      }
    }

    // Fallback to webhook if Supabase is not configured or failed
    if (!success) {
      const result = await submitToWebhook({
        name: data.name,
        email: data.email,
        language,
      });
      success = result.success;
    }

    setSubmitting(false);

    if (success) {
      setDone(true);
      toast.success(t("toast.webhook_success"), {
        description: data.email,
      });
    } else {
      toast.error(language === 'vi' ? 'Có lỗi xảy ra, vui lòng thử lại sau.' : 'Something went wrong. Please try again later.');
    }
  }

  return (
    <section id="buy" className="relative py-36 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px section-line" />
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2.5rem] glass-strong shadow-[0_40px_100px_-20px_rgba(0,0,0,0.7)]"
        >
          {/* Background orbs */}
          <div className="absolute -top-40 -right-40 h-[350px] w-[350px] rounded-full bg-[#6D5EF5]/35 blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-40 -left-40 h-[350px] w-[350px] rounded-full bg-[#00D9FF]/25 blur-[80px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[200px] w-[200px] rounded-full bg-[#A855F7]/20 blur-[60px] pointer-events-none" />

          {/* Gradient border */}
          <div className="absolute inset-0 rounded-[2.5rem] p-px pointer-events-none">
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-white/12 via-white/4 to-transparent" />
          </div>

          <div className="relative p-10 sm:p-16">
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#00D9FF] mb-8 flex items-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-[#00D9FF] to-transparent" />
              {t("newsletter.badge")}
            </p>
            <h2 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight">
              {t("newsletter.title_1")}{" "}
              <span className="text-gradient-aurora">{t("newsletter.title_2")}</span>
            </h2>
            <p className="mt-5 text-[1.0625rem] text-text-muted max-w-lg">
              {t("newsletter.subtitle")}
            </p>

            <AnimatePresence mode="wait">
              {done ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-10 rounded-2xl glass p-6 flex items-center gap-5 border border-[#6D5EF5]/25"
                >
                  <div className="relative h-14 w-14 shrink-0 rounded-full bg-gradient-to-br from-[#6D5EF5] to-[#00D9FF] grid place-items-center shadow-[0_0_32px_-6px_rgba(109,94,245,0.7)]">
                    <Check className="h-6 w-6 text-white" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-text-main mb-2">
                      {t("newsletter.success_title")}
                    </h3>
                    <p className="text-text-muted">
                      {t("newsletter.success_desc")}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="mt-10 space-y-4"
                  noValidate
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="sr-only">Name</label>
                      <input
                        id="name"
                        {...register("name")}
                        type="text"
                        placeholder={t("newsletter.name_placeholder")}
                        className={`w-full rounded-2xl bg-surface-5 border px-5 py-4 text-text-main placeholder:text-text-muted/40 focus:outline-none transition-all duration-200 ${
                          errors.name
                            ? "border-red-500/60 focus:border-red-500/80 focus:ring-2 focus:ring-red-500/20"
                            : "border-border-8 focus:border-[#6D5EF5]/70 focus:ring-2 focus:ring-[#6D5EF5]/20 hover:border-border-15"
                        }`}
                      />
                      {errors.name && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-xs text-red-400"
                        >
                          {errors.name.message}
                        </motion.p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="sr-only">Email</label>
                      <input
                        id="email"
                        type="email"
                        {...register("email")}
                        placeholder={t("newsletter.email_placeholder")}
                        className={`w-full rounded-2xl bg-surface-5 border px-5 py-4 text-text-main placeholder:text-text-muted/40 focus:outline-none transition-all duration-200 ${
                          errors.email
                            ? "border-red-500/60 focus:border-red-500/80 focus:ring-2 focus:ring-red-500/20"
                            : "border-border-8 focus:border-[#6D5EF5]/70 focus:ring-2 focus:ring-[#6D5EF5]/20 hover:border-border-15"
                        }`}
                      />
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-xs text-red-400"
                        >
                          {errors.email.message}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  <label className="flex items-start gap-3 text-sm text-text-muted cursor-pointer select-none group">
                    <div className="relative mt-0.5">
                      <input
                        type="checkbox"
                        {...register("consent")}
                        className="sr-only peer"
                        id="consent"
                      />
                      <div className="h-5 w-5 rounded-md border border-border-20 bg-surface-5 flex items-center justify-center group-hover:border-border-20 transition-all text-transparent peer-checked:text-[#6D5EF5] peer-checked:border-[#6D5EF5]/50">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </div>
                    </div>
                    <div className="text-[0.8125rem] text-text-muted/80 leading-relaxed mt-0.5">
                      {t("newsletter.consent")}
                    </div>
                  </label>
                  {errors.consent && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-400"
                    >
                      {errors.consent.message}
                    </motion.p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary w-full sm:w-auto min-w-[200px] disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none mt-2 group"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {t("newsletter.reserving_btn")}
                      </>
                    ) : (
                      <>
                        {t("newsletter.reserve_btn")}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
