"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

/**
 * QUICK MESSAGE form for /contact. Posts { type: "MESSAGE" } to
 * /api/bookings - the same enquiry pipeline as booking requests
 * (backend contract: MESSAGE requires name + phone + message only).
 */

const messageSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Tell us your name.")
    .max(80, "Name is too long."),
  phone: z
    .string()
    .trim()
    .regex(/^[+]?[0-9][0-9\s-]{8,15}$/, "Enter a valid phone number."),
  message: z
    .string()
    .trim()
    .min(2, "Write a short message.")
    .max(500, "Message is too long."),
});

type MessageValues = z.infer<typeof messageSchema>;

const inputClass =
  "h-12 rounded-none border border-ink/15 bg-paper text-base text-ink shadow-none transition-colors placeholder:text-steel/60 focus-visible:border-brand focus-visible:ring-0 md:text-base";

function FieldErrorLine({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p
      role="alert"
      className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-brand"
    >
      <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
      {message}
    </p>
  );
}

export function QuickMessageForm() {
  const { toast } = useToast();
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverIssues, setServerIssues] = useState<
    Record<string, string[]> | null
  >(null);
  const [success, setSuccess] = useState<MessageValues | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MessageValues>({
    resolver: zodResolver(messageSchema),
    defaultValues: { name: "", phone: "", message: "" },
  });

  const errorFor = (field: keyof MessageValues): string | undefined =>
    errors[field]?.message ?? serverIssues?.[field]?.[0];

  const onSubmit = async (values: MessageValues) => {
    setServerError(null);
    setServerIssues(null);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "MESSAGE",
          name: values.name,
          phone: values.phone,
          message: values.message,
        }),
      });
      const data = (await res.json()) as {
        ok: boolean;
        error?: string;
        issues?: Record<string, string[]>;
      };

      if (!res.ok || !data.ok) {
        const fallback =
          data.error ?? "Something went wrong. Please call or WhatsApp us.";
        if (data.issues) {
          setServerIssues(data.issues);
        }
        setServerError(fallback);
        toast({ title: "Message not sent.", description: fallback });
        return;
      }

      setSuccess(values);
      toast({
        title: "Message received.",
        description:
          "We will get back to you - usually fastest on WhatsApp.",
      });
    } catch {
      const networkError =
        "Network problem - your message was not sent. Please call or WhatsApp us.";
      setServerError(networkError);
      toast({ title: "Message not sent.", description: networkError });
    }
  };

  if (success) {
    return (
      <div
        aria-live="polite"
        className="border border-ink/10 bg-cream p-6 shadow-soft sm:p-8"
      >
        <CheckCircle2 className="h-10 w-10 text-brand" aria-hidden="true" />
        <h3 className="display-2 mt-4 text-ink">MESSAGE RECEIVED.</h3>
        <p className="mt-3 max-w-md text-base leading-relaxed text-ink-soft">
          We will get back to you — usually fastest on WhatsApp.
        </p>
        <button
          type="button"
          onClick={() => {
            setSuccess(null);
            setServerError(null);
            setServerIssues(null);
            reset();
          }}
          className="label-micro link-underline mt-6 w-fit text-steel transition-colors hover:text-brand"
        >
          SEND ANOTHER MESSAGE
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="card-soft p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="message-name" className="label-micro text-steel">
            01 · YOUR NAME
          </Label>
          <Input
            id="message-name"
            type="text"
            autoComplete="name"
            placeholder="e.g. Rakib Hasan"
            aria-invalid={!!errorFor("name")}
            className={`mt-2 ${inputClass}`}
            {...register("name")}
          />
          <FieldErrorLine message={errorFor("name")} />
        </div>

        <div>
          <Label htmlFor="message-phone" className="label-micro text-steel">
            02 · PHONE
          </Label>
          <Input
            id="message-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="01XXXXXXXXX"
            aria-invalid={!!errorFor("phone")}
            className={`mt-2 ${inputClass}`}
            {...register("phone")}
          />
          <FieldErrorLine message={errorFor("phone")} />
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="message-body" className="label-micro text-steel">
            03 · YOUR MESSAGE
          </Label>
          <Textarea
            id="message-body"
            rows={4}
            maxLength={500}
            placeholder="What do you want to ask or arrange?"
            aria-invalid={!!errorFor("message")}
            className={`mt-2 ${inputClass} min-h-12 resize-none py-2.5`}
            {...register("message")}
          />
          <FieldErrorLine message={errorFor("message")} />
        </div>
      </div>

      {serverError ? (
        <div
          role="alert"
          className="mt-5 flex items-start gap-2 border border-brand/30 bg-brand/10 px-4 py-3"
        >
          <AlertCircle
            className="mt-0.5 h-4 w-4 shrink-0 text-brand"
            aria-hidden="true"
          />
          <p className="text-sm font-semibold text-brand">{serverError}</p>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-base btn-red group mt-6 w-full"
      >
        {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
        <ArrowRight
          className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </button>

      <p className="label-micro mt-4 text-center text-steel">
        READ BY A PERSON · REPLIED BY A PERSON
      </p>
    </form>
  );
}
