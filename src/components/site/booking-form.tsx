"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertCircle, ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { track } from "@/lib/analytics";
import { whatsappMessageUrl } from "@/data/site";

const formSchema = z.object({
  rideDate: z.string().min(1, "Choose a date for your ride."),
  duration: z.enum(["HALF_DAY", "FULL_DAY"], {
    message: "Choose how long you want the scooty.",
  }),
  vehicleId: z.string().optional(),
  name: z.string().trim().min(2, "Tell us your name.").max(80),
  phone: z
    .string()
    .trim()
    .regex(/^[+]?[0-9][0-9\s-]{8,15}$/, "Enter a valid phone number."),
  pickupPreference: z.enum(["shop", "hotel", "unsure"]).optional(),
  message: z.string().trim().max(500, "Message is too long.").optional(),
});

type FormValues = z.infer<typeof formSchema>;

const DURATION_LABELS: Record<string, string> = {
  HALF_DAY: "HALF DAY",
  FULL_DAY: "FULL DAY",
};

const VEHICLE_LABELS: Record<string, string> = {
  "mini-scooty": "MINI SCOOTY",
  "standard-scooty": "STANDARD SCOOTY",
};

const PICKUP_LABELS: Record<string, string> = {
  shop: "PICK UP AT THE SHOP",
  hotel: "HOTEL DELIVERY (REQUEST)",
  unsure: "NOT SURE YET",
};

function todayLocal(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

type BookingFormProps = {
  defaultVehicleId?: string;
  defaultMessage?: string;
  compact?: boolean;
};

export function BookingForm({
  defaultVehicleId,
  defaultMessage,
  compact = false,
}: BookingFormProps) {
  const { toast } = useToast();
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState<FormValues | null>(null);
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
      vehicleId: defaultVehicleId ?? "",
      name: "",
      phone: "",
      pickupPreference: "shop",
      message: defaultMessage ?? "",
    },
  });

  useEffect(() => {
    if (defaultVehicleId) {
      setValue("vehicleId", defaultVehicleId);
    }
  }, [defaultVehicleId, setValue]);

  useEffect(() => {
    if (defaultMessage) {
      setValue("message", defaultMessage);
    }
  }, [defaultMessage, setValue]);

  const duration = watch("duration");
  const vehicleId = watch("vehicleId");
  const pickupPreference = watch("pickupPreference");
  const rideDate = watch("rideDate");

  const onSubmit = async (values: FormValues) => {
    setServerError(null);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          vehicleId:
            values.vehicleId && values.vehicleId !== "none"
              ? values.vehicleId
              : null,
          message: values.message ? values.message : null,
        }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };

      if (!res.ok || !data.ok) {
        setServerError(
          data.error ?? "Something went wrong. Please call or WhatsApp us.",
        );
        return;
      }

      track("submit_booking", { duration: values.duration });
      setSuccess(values);
      toast({
        title: "Request received.",
        description:
          "We'll contact you shortly to confirm availability and rental details.",
      });
    } catch {
      setServerError(
        "Network problem - your request was not sent. Please call or WhatsApp us.",
      );
    }
  };

  const whatsappHandoff = useMemo(() => {
    if (!success) return whatsappMessageUrl(
      "Hi Red Scooty! I just sent a booking request on your website. Can you confirm it?"
    );
    const lines = [
      "Hi Red Scooty! I just sent a booking request on your website.",
      `Date: ${success.rideDate}`,
      `Duration: ${DURATION_LABELS[success.duration] ?? success.duration}`,
      `Scooty: ${
        success.vehicleId
          ? (VEHICLE_LABELS[success.vehicleId] ?? success.vehicleId)
          : "No preference"
      }`,
      `Name: ${success.name}`,
      success.pickupPreference
        ? `Pickup: ${PICKUP_LABELS[success.pickupPreference]}`
        : null,
    ].filter(Boolean);
    return whatsappMessageUrl(lines.join("\n"));
  }, [success]);

  if (success) {
    return (
      <div className="p-6 text-center sm:p-8" aria-live="polite">
        <CheckCircle2 className="mx-auto h-12 w-12 text-brand" aria-hidden="true" />
        <h3 className="mt-4 font-display text-5xl leading-none tracking-wide text-ink">
          REQUEST RECEIVED.
        </h3>
        <p className="mx-auto mt-3 max-w-sm text-sm text-ink-soft">
          We&apos;ll contact you shortly to confirm availability and rental
          details. Fastest way? Message us on WhatsApp with your request summary.
        </p>

        <dl className="mx-auto mt-6 grid max-w-sm grid-cols-2 gap-2 text-left">
          <div className="border-2 border-ink bg-cream px-3 py-2">
            <dt className="label-micro text-steel">DATE</dt>
            <dd className="font-display text-xl tracking-wide text-ink">
              {success.rideDate}
            </dd>
          </div>
          <div className="border-2 border-ink bg-cream px-3 py-2">
            <dt className="label-micro text-steel">DURATION</dt>
            <dd className="font-display text-xl tracking-wide text-ink">
              {DURATION_LABELS[success.duration] ?? success.duration}
            </dd>
          </div>
        </dl>

        <div className="mx-auto mt-6 flex max-w-sm flex-col gap-3">
          <Button
            asChild
            className="h-14 rounded-none border-2 border-ink bg-brand font-display text-2xl tracking-wider text-white shadow-hard transition-all hover:bg-ink hover:shadow-hard-red"
          >
            <a href={whatsappHandoff} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />
              CONTINUE ON WHATSAPP
            </a>
          </Button>
          <button
            type="button"
            onClick={() => {
              setSuccess(null);
              reset({
                rideDate: "",
                duration: "FULL_DAY",
                vehicleId: "",
                name: "",
                phone: "",
                pickupPreference: "shop",
                message: "",
              });
            }}
            className="label-micro text-steel underline-offset-4 hover:text-brand hover:underline"
          >
            MAKE ANOTHER REQUEST
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={compact ? "p-5 sm:p-6" : "p-6 sm:p-8"}
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {/* Date */}
        <div className="sm:col-span-1">
          <Label htmlFor="rideDate" className="label-micro text-steel">
            01 · WHEN
          </Label>
          <Input
            id="rideDate"
            type="date"
            min={today}
            required
            aria-invalid={!!errors.rideDate}
            className="mt-2 h-12 rounded-none border-2 border-ink bg-paper text-base text-ink shadow-hard-sm focus-visible:ring-brand"
            {...register("rideDate")}
          />
          {errors.rideDate ? (
            <p role="alert" className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-brand">
              <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
              {errors.rideDate.message}
            </p>
          ) : null}
        </div>

        {/* Duration */}
        <div className="sm:col-span-1">
          <Label htmlFor="duration" className="label-micro text-steel">
            02 · HOW LONG
          </Label>
          <input type="hidden" {...register("duration")} />
          <Select
            value={duration}
            onValueChange={(v) => setValue("duration", v as FormValues["duration"])}
          >
            <SelectTrigger
              id="duration"
              aria-label="Rental duration"
              className="mt-2 h-12 w-full rounded-none border-2 border-ink bg-paper text-base shadow-hard-sm focus:ring-brand"
            >
              <SelectValue placeholder="Choose duration" />
            </SelectTrigger>
            <SelectContent className="rounded-none border-2 border-ink">
              <SelectItem value="HALF_DAY">HALF DAY</SelectItem>
              <SelectItem value="FULL_DAY">FULL DAY</SelectItem>
            </SelectContent>
          </Select>
          {errors.duration ? (
            <p role="alert" className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-brand">
              <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
              {errors.duration.message}
            </p>
          ) : null}
        </div>

        {/* Vehicle */}
        <div className="sm:col-span-2">
          <Label htmlFor="vehicleId" className="label-micro text-steel">
            03 · WHICH RIDE
          </Label>
          <input type="hidden" {...register("vehicleId")} />
          <Select
            value={vehicleId ?? ""}
            onValueChange={(v) => setValue("vehicleId", v)}
          >
            <SelectTrigger
              id="vehicleId"
              aria-label="Preferred scooty"
              className="mt-2 h-12 w-full rounded-none border-2 border-ink bg-paper text-base shadow-hard-sm focus:ring-brand"
            >
              <SelectValue placeholder="No preference" />
            </SelectTrigger>
            <SelectContent className="rounded-none border-2 border-ink">
              <SelectItem value="none">NO PREFERENCE</SelectItem>
              <SelectItem value="mini-scooty">MINI SCOOTY</SelectItem>
              <SelectItem value="standard-scooty">STANDARD SCOOTY</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Name */}
        <div className="sm:col-span-1">
          <Label htmlFor="name" className="label-micro text-steel">
            04 · YOUR NAME
          </Label>
          <Input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="e.g. Rakib Hasan"
            aria-invalid={!!errors.name}
            className="mt-2 h-12 rounded-none border-2 border-ink bg-paper text-base text-ink placeholder:text-steel/60 shadow-hard-sm focus-visible:ring-brand"
            {...register("name")}
          />
          {errors.name ? (
            <p role="alert" className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-brand">
              <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
              {errors.name.message}
            </p>
          ) : null}
        </div>

        {/* Phone */}
        <div className="sm:col-span-1">
          <Label htmlFor="phone" className="label-micro text-steel">
            05 · PHONE
          </Label>
          <Input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="01XXXXXXXXX"
            aria-invalid={!!errors.phone}
            className="mt-2 h-12 rounded-none border-2 border-ink bg-paper text-base text-ink placeholder:text-steel/60 shadow-hard-sm focus-visible:ring-brand"
            {...register("phone")}
          />
          {errors.phone ? (
            <p role="alert" className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-brand">
              <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
              {errors.phone.message}
            </p>
          ) : null}
        </div>

        {/* Pickup */}
        <div className="sm:col-span-2">
          <Label htmlFor="pickupPreference" className="label-micro text-steel">
            06 · PICKUP
          </Label>
          <input type="hidden" {...register("pickupPreference")} />
          <Select
            value={pickupPreference ?? "shop"}
            onValueChange={(v) =>
              setValue("pickupPreference", v as FormValues["pickupPreference"])
            }
          >
            <SelectTrigger
              id="pickupPreference"
              aria-label="Pickup preference"
              className="mt-2 h-12 w-full rounded-none border-2 border-ink bg-paper text-base shadow-hard-sm focus:ring-brand"
            >
              <SelectValue placeholder="Pickup preference" />
            </SelectTrigger>
            <SelectContent className="rounded-none border-2 border-ink">
              <SelectItem value="shop">PICK UP AT THE SHOP</SelectItem>
              <SelectItem value="hotel">HOTEL DELIVERY (REQUEST)</SelectItem>
              <SelectItem value="unsure">NOT SURE YET</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Message */}
        <div className="sm:col-span-2">
          <Label htmlFor="message" className="label-micro text-steel">
            07 · ANYTHING ELSE? (OPTIONAL)
          </Label>
          <Textarea
            id="message"
            rows={3}
            placeholder="Route plans, questions, hotel name..."
            aria-invalid={!!errors.message}
            className="mt-2 resize-none rounded-none border-2 border-ink bg-paper text-base text-ink placeholder:text-steel/60 shadow-hard-sm focus-visible:ring-brand"
            {...register("message")}
          />
          {errors.message ? (
            <p role="alert" className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-brand">
              <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
              {errors.message.message}
            </p>
          ) : null}
        </div>
      </div>

      {serverError ? (
        <div
          role="alert"
          className="mt-5 flex items-start gap-2 border-2 border-brand bg-brand/10 px-4 py-3"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
          <p className="text-sm font-semibold text-brand">{serverError}</p>
        </div>
      ) : null}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 h-14 w-full rounded-none border-2 border-ink bg-brand font-display text-2xl tracking-wider text-white shadow-hard transition-all hover:-translate-y-0.5 hover:bg-ink hover:shadow-hard-red disabled:translate-y-0 disabled:opacity-70"
      >
        {isSubmitting ? "SENDING..." : "REQUEST MY RIDE"}
        <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
      </Button>

      <p className="label-micro mt-4 text-center text-steel">
        NO PAYMENT ONLINE · WE CONFIRM EVERY REQUEST PERSONALLY
      </p>
    </form>
  );
}
