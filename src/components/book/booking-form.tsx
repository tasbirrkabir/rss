"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSearchParams } from "next/navigation";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  Wand2,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TrackedLink } from "@/components/site/tracked-link";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { track } from "@/lib/analytics";
import { whatsappMessageUrl } from "@/data/site";
import { findRoute } from "@/data/ride-routes";
import { findMood } from "@/data/ride-moods";

/**
 * Booking request form for /book (multi-page conversion cluster).
 * Built on the same contract as the legacy booking form: react-hook-form +
 * zod client validation, POST /api/bookings { type: "BOOKING", ... }, inline
 * field errors matched to the API issue keys, success panel + WhatsApp handoff.
 *
 * Prefill contract (shared context section 7):
 * - /book?vehicle=mini-scooty|standard-scooty -> preselect scooty
 * - /book?route={slug}   -> message "I want to ride: {title} ({tags})" + routeRef
 * - /book?mood={id}      -> message "I want the {label} ride." + routeRef
 *
 * Honesty rules: no availability claims, no prices, confirmation is personal.
 */

const formSchema = z.object({
  rideDate: z.string().min(1, "Choose a date for your ride."),
  duration: z.enum(["HALF_DAY", "FULL_DAY", "MULTI_DAY"], {
    message: "Choose how long you want the scooty.",
  }),
  vehicleId: z.string().optional(),
  riders: z.string().trim().max(40, "Riders field is too long.").optional(),
  name: z
    .string()
    .trim()
    .min(2, "Tell us your name.")
    .max(80, "Name is too long."),
  phone: z
    .string()
    .trim()
    .regex(/^[+]?[0-9][0-9\s-]{8,15}$/, "Enter a valid phone number."),
  pickupPreference: z
    .enum(["station", "hotel", "town", "shop", "unsure"])
    .optional(),
  routeRef: z.string().trim().max(80).optional(),
  message: z.string().trim().max(500, "Message is too long.").optional(),
});

type FormValues = z.infer<typeof formSchema>;
type PickupValue = NonNullable<FormValues["pickupPreference"]>;
type DurationValue = FormValues["duration"];
type SuccessState = FormValues & { routeLabel: string | null };

const DURATION_OPTIONS: { value: DurationValue; label: string }[] = [
  { value: "HALF_DAY", label: "HALF DAY" },
  { value: "FULL_DAY", label: "FULL DAY" },
  { value: "MULTI_DAY", label: "MULTI DAY" },
];

const DURATION_LABELS: Record<DurationValue, string> = {
  HALF_DAY: "HALF DAY",
  FULL_DAY: "FULL DAY",
  MULTI_DAY: "MULTI DAY",
};

const VEHICLE_OPTIONS = [
  { value: "none", label: "NO PREFERENCE" },
  { value: "mini-scooty", label: "MINI SCOOTY" },
  { value: "standard-scooty", label: "STANDARD SCOOTY" },
] as const;

const VEHICLE_LABELS: Record<string, string> = {
  "mini-scooty": "MINI SCOOTY",
  "standard-scooty": "STANDARD SCOOTY",
};

const PICKUP_OPTIONS = [
  { value: "station", label: "SREEMANGAL STATION" },
  { value: "hotel", label: "HOTEL" },
  { value: "town", label: "CITY CENTER" },
  { value: "shop", label: "RED SCOOTY PICKUP" },
  { value: "unsure", label: "NOT SURE" },
] as const;

const PICKUP_LABELS: Record<PickupValue, string> = {
  station: "SREEMANGAL STATION",
  hotel: "HOTEL",
  town: "CITY CENTER",
  shop: "RED SCOOTY PICKUP",
  unsure: "NOT SURE",
};

const PICKUP_NOTES: Record<PickupValue, string> = {
  station:
    "We'll aim to meet you near the station — details confirmed personally.",
  hotel: "Hotel pickup is possible — confirmed with Red Scooty on request.",
  town: "Start your ride from the Red Scooty pickup point.",
  shop: "Collect from Jalalia Road, Sreemangal 3210.",
  unsure: "No problem — we'll sort it out together.",
};

const inputClass =
  "h-12 rounded-none border border-ink/15 bg-paper text-base text-ink shadow-none transition-colors placeholder:text-steel/60 focus-visible:border-brand focus-visible:ring-0 md:text-base";

function todayLocal(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

function SegmentOption({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "min-h-11 border px-4 py-2 font-display text-lg tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
        selected
          ? "border-ink bg-ink text-cream"
          : "border-ink/20 bg-paper text-ink hover:border-ink/50 hover:bg-cream",
      )}
    >
      {children}
    </button>
  );
}

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

export function BookingForm() {
  const { toast } = useToast();
  const searchParams = useSearchParams();

  const prefill = useMemo(() => {
    const vehicleParam = searchParams.get("vehicle");
    const routeParam = searchParams.get("route");
    const moodParam = searchParams.get("mood");

    const vehicleId =
      vehicleParam === "mini-scooty" || vehicleParam === "standard-scooty"
        ? vehicleParam
        : "none";

    const route = findRoute(routeParam);
    const mood = findMood(moodParam);

    const sources: string[] = [];
    let routeRef: string | undefined;
    let message = "";
    let routeLabel: string | null = null;

    if (route) {
      message = `I want to ride: ${route.title} (${route.tags.join(" · ")})`;
      routeRef = route.id;
      routeLabel = route.title;
      sources.push("RIDE ROUTE");
    } else if (mood) {
      message = `I want the ${mood.label} ride.`;
      routeRef = mood.id;
      routeLabel = mood.label;
      sources.push("RIDE MOOD");
    }

    if (vehicleId !== "none") {
      sources.push("SCOOTY PAGE");
    }

    return {
      vehicleId,
      routeRef,
      message,
      routeLabel,
      sourceLabel: sources.join(" + "),
    };
  }, [searchParams]);

  const [serverError, setServerError] = useState<string | null>(null);
  const [serverIssues, setServerIssues] = useState<Record<string, string[]> | null>(
    null,
  );
  const [success, setSuccess] = useState<SuccessState | null>(null);
  const today = useMemo(() => todayLocal(), []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rideDate: "",
      duration: "FULL_DAY",
      vehicleId: prefill.vehicleId,
      riders: "",
      name: "",
      phone: "",
      pickupPreference: undefined,
      routeRef: prefill.routeRef,
      message: prefill.message || "",
    },
  });

  // Keep form values in sync when a prefill query is present.
  useEffect(() => {
    setValue("vehicleId", prefill.vehicleId);
    setValue("routeRef", prefill.routeRef);
    if (prefill.message) {
      setValue("message", prefill.message);
    }
  }, [prefill, setValue]);

  // start_booking fires once on mount (first-interaction fallback per brief).
  const startTracked = useRef(false);
  useEffect(() => {
    if (startTracked.current) return;
    startTracked.current = true;
    track("start_booking", {
      source: prefill.sourceLabel ? "book_prefilled" : "book_direct",
    });
  }, [prefill.sourceLabel]);

  const duration = watch("duration");
  const vehicleId = watch("vehicleId");
  const pickupPreference = watch("pickupPreference");

  const errorFor = (field: keyof FormValues): string | undefined =>
    errors[field]?.message ?? serverIssues?.[field]?.[0];

  const onSubmit = async (values: FormValues) => {
    setServerError(null);
    setServerIssues(null);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "BOOKING",
          rideDate: values.rideDate,
          duration: values.duration,
          vehicleId:
            values.vehicleId && values.vehicleId !== "none"
              ? values.vehicleId
              : null,
          riders: values.riders ? values.riders : null,
          name: values.name,
          phone: values.phone,
          pickupPreference: values.pickupPreference ?? null,
          routeRef: values.routeRef ? values.routeRef : null,
          message: values.message ? values.message : null,
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
        toast({ title: "Request not sent.", description: fallback });
        return;
      }

      track("submit_booking", {
        duration: values.duration,
        routeRef: values.routeRef ?? null,
      });
      setSuccess({ ...values, routeLabel: prefill.routeLabel });
      toast({
        title: "Request received.",
        description:
          "Red Scooty will contact you shortly to confirm availability.",
      });
    } catch {
      const networkError =
        "Network problem - your request was not sent. Please call or WhatsApp us.";
      setServerError(networkError);
      toast({ title: "Request not sent.", description: networkError });
    }
  };

  const whatsappHandoff = useMemo(() => {
    if (!success) {
      return whatsappMessageUrl(
        "Hi Red Scooty! I just sent a booking request on your website. Can you confirm it?",
      );
    }
    const lines = [
      "Hi Red Scooty! I just sent a booking request on your website.",
      `Date: ${success.rideDate}`,
      `Duration: ${DURATION_LABELS[success.duration]}`,
      `Scooty: ${
        success.vehicleId && success.vehicleId !== "none"
          ? (VEHICLE_LABELS[success.vehicleId] ?? success.vehicleId)
          : "No preference"
      }`,
    ];
    if (success.routeLabel) {
      lines.push(`Route: ${success.routeLabel}`);
    }
    lines.push(`Name: ${success.name}`);
    if (success.pickupPreference) {
      lines.push(`Pickup: ${PICKUP_LABELS[success.pickupPreference]}`);
    }
    return whatsappMessageUrl(lines.join("\n"));
  }, [success]);

  const resetForAnother = () => {
    setSuccess(null);
    setServerError(null);
    setServerIssues(null);
    reset({
      rideDate: "",
      duration: "FULL_DAY",
      vehicleId: prefill.vehicleId,
      riders: "",
      name: "",
      phone: "",
      pickupPreference: undefined,
      routeRef: prefill.routeRef,
      message: prefill.message || "",
    });
  };

  if (success) {
    return (
      <div className="p-6 sm:p-10" aria-live="polite">
        <div className="bg-cream p-6 sm:p-8">
          <CheckCircle2 className="h-10 w-10 text-brand" aria-hidden="true" />
          <h3 className="display-1 mt-4 text-ink">REQUEST RECEIVED.</h3>
          <p className="mt-3 max-w-md text-base leading-relaxed text-ink-soft">
            Red Scooty will contact you shortly to confirm availability.
          </p>

          <dl className="mt-6 grid grid-cols-2 gap-2 sm:max-w-md">
            <div className="border border-ink/10 bg-paper px-3 py-2">
              <dt className="label-micro text-steel">DATE</dt>
              <dd className="font-display text-xl tracking-wide text-ink">
                {success.rideDate}
              </dd>
            </div>
            <div className="border border-ink/10 bg-paper px-3 py-2">
              <dt className="label-micro text-steel">DURATION</dt>
              <dd className="font-display text-xl tracking-wide text-ink">
                {DURATION_LABELS[success.duration]}
              </dd>
            </div>
            <div className="border border-ink/10 bg-paper px-3 py-2">
              <dt className="label-micro text-steel">SCOOTY</dt>
              <dd className="font-display text-xl tracking-wide text-ink">
                {success.vehicleId && success.vehicleId !== "none"
                  ? (VEHICLE_LABELS[success.vehicleId] ?? success.vehicleId)
                  : "NO PREFERENCE"}
              </dd>
            </div>
            {success.routeLabel ? (
              <div className="border border-ink/10 bg-paper px-3 py-2">
                <dt className="label-micro text-steel">RIDE</dt>
                <dd className="font-display text-xl tracking-wide text-ink">
                  {success.routeLabel}
                </dd>
              </div>
            ) : null}
          </dl>

          <div className="mt-8 flex flex-col items-start gap-3 sm:max-w-md">
            <TrackedLink
              event="click_whatsapp"
              source="book_form_success"
              href={whatsappHandoff}
              external
              className="btn-base btn-red group w-full"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              CONTINUE ON WHATSAPP
              <ArrowRight
                className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </TrackedLink>
            <button
              type="button"
              onClick={resetForAnother}
              className="label-micro link-underline text-steel transition-colors hover:text-brand"
            >
              MAKE ANOTHER REQUEST
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8" noValidate>
      {prefill.sourceLabel ? (
        <p className="label-micro mb-6 inline-flex items-center gap-1.5 border border-dashed border-brand px-2 py-1 text-brand">
          <Wand2 className="h-3.5 w-3.5" aria-hidden="true" />
          PRE-FILLED FROM: {prefill.sourceLabel}
        </p>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        {/* 01 · NAME */}
        <div>
          <Label htmlFor="booking-name" className="label-micro text-steel">
            01 · YOUR NAME
          </Label>
          <Input
            id="booking-name"
            type="text"
            autoComplete="name"
            placeholder="e.g. Rakib Hasan"
            aria-invalid={!!errorFor("name")}
            className={`mt-2 ${inputClass}`}
            {...register("name")}
          />
          <FieldErrorLine message={errorFor("name")} />
        </div>

        {/* 02 · PHONE */}
        <div>
          <Label htmlFor="booking-phone" className="label-micro text-steel">
            02 · PHONE
          </Label>
          <Input
            id="booking-phone"
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

        {/* 03 · DATE */}
        <div>
          <Label htmlFor="booking-date" className="label-micro text-steel">
            03 · RIDE DATE
          </Label>
          <Input
            id="booking-date"
            type="date"
            min={today}
            required
            aria-invalid={!!errorFor("rideDate")}
            className={`mt-2 ${inputClass}`}
            {...register("rideDate")}
          />
          <FieldErrorLine message={errorFor("rideDate")} />
        </div>

        {/* 04 · DURATION */}
        <div>
          <p id="booking-duration-label" className="label-micro text-steel">
            04 · DURATION
          </p>
          <input type="hidden" {...register("duration")} />
          <div
            role="group"
            aria-labelledby="booking-duration-label"
            className="mt-2 flex flex-wrap gap-2"
          >
            {DURATION_OPTIONS.map((opt) => (
              <SegmentOption
                key={opt.value}
                selected={duration === opt.value}
                onClick={() => setValue("duration", opt.value)}
              >
                {opt.label}
              </SegmentOption>
            ))}
          </div>
          <FieldErrorLine message={errorFor("duration")} />
        </div>

        {/* 05 · PREFERRED SCOOTY */}
        <div className="sm:col-span-2">
          <p id="booking-vehicle-label" className="label-micro text-steel">
            05 · PREFERRED SCOOTY
          </p>
          <input type="hidden" {...register("vehicleId")} />
          <div
            role="group"
            aria-labelledby="booking-vehicle-label"
            className="mt-2 flex flex-wrap gap-2"
          >
            {VEHICLE_OPTIONS.map((opt) => (
              <SegmentOption
                key={opt.value}
                selected={vehicleId === opt.value}
                onClick={() => setValue("vehicleId", opt.value)}
              >
                {opt.label}
              </SegmentOption>
            ))}
          </div>
        </div>

        {/* 06 · NUMBER OF RIDERS */}
        <div className="sm:col-span-2">
          <Label htmlFor="booking-riders" className="label-micro text-steel">
            06 · NUMBER OF RIDERS (OPTIONAL)
          </Label>
          <Input
            id="booking-riders"
            type="text"
            placeholder="e.g. 2 adults"
            autoComplete="off"
            maxLength={40}
            aria-invalid={!!errorFor("riders")}
            className={`mt-2 max-w-xs ${inputClass}`}
            {...register("riders")}
          />
          <FieldErrorLine message={errorFor("riders")} />
        </div>

        {/* 07 · WHERE ARE YOU RIDING FROM? */}
        <div className="sm:col-span-2">
          <p id="booking-pickup-label" className="label-micro text-steel">
            07 · WHERE ARE YOU RIDING FROM?
          </p>
          <input type="hidden" {...register("pickupPreference")} />
          <div
            role="group"
            aria-labelledby="booking-pickup-label"
            className="mt-2 flex flex-wrap gap-2"
          >
            {PICKUP_OPTIONS.map((opt) => (
              <SegmentOption
                key={opt.value}
                selected={pickupPreference === opt.value}
                onClick={() => setValue("pickupPreference", opt.value)}
              >
                {opt.label}
              </SegmentOption>
            ))}
          </div>
          <div aria-live="polite">
            {pickupPreference ? (
              <p className="mt-3 border-l-2 border-brand bg-cream px-3 py-2 text-sm text-ink-soft">
                {PICKUP_NOTES[pickupPreference]}
              </p>
            ) : null}
          </div>
        </div>

        {/* 08 · MESSAGE */}
        <div className="sm:col-span-2">
          <Label htmlFor="booking-message" className="label-micro text-steel">
            08 · ANYTHING ELSE? (OPTIONAL)
          </Label>
          <Textarea
            id="booking-message"
            rows={3}
            maxLength={500}
            placeholder="Route plans, questions, hotel name..."
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
          className="mt-6 flex items-start gap-2 border border-brand/30 bg-brand/10 px-4 py-3"
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
        className="btn-base btn-red group mt-8 w-full"
      >
        {isSubmitting ? "SENDING..." : "REQUEST MY RIDE"}
        <ArrowRight
          className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </button>
    </form>
  );
}
