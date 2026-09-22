"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ImagePlus, Loader2, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * Image field with three ways to set the value:
 * 1. Upload a file (POST /api/admin/upload -> /public/uploads)
 * 2. Pick from the existing image library (/images + /uploads)
 * 3. Paste a path manually
 */
export function ImagePickerField({
  id,
  label,
  value,
  onChange,
  previewAspect = "aspect-[4/3]",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (next: string) => void;
  previewAspect?: string;
}) {
  const [library, setLibrary] = useState<string[]>([]);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const loadLibrary = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/upload");
      if (!res.ok) return;
      const data = (await res.json()) as { library?: string[] };
      setLibrary(data.library ?? []);
    } catch {
      // silent — picker just stays empty
    }
  }, []);

  useEffect(() => {
    if (pickerOpen) void loadLibrary();
  }, [pickerOpen, loadLibrary]);

  async function upload(file: File) {
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: form,
      });
      const data = (await res.json()) as { ok: boolean; url?: string; error?: string };
      if (!res.ok || !data.ok || !data.url) {
        toast.error(data.error ?? "Upload failed.");
        return;
      }
      onChange(data.url);
      toast.success("Image uploaded.");
    } catch {
      toast.error("Upload failed. Check your connection.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        {/* Preview */}
        <div
          className={`relative w-full shrink-0 overflow-hidden border border-ink/15 bg-paper sm:w-44 ${previewAspect}`}
        >
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={value}
              alt="Selected image preview"
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-steel">
              <ImagePlus className="h-8 w-8" aria-hidden="true" />
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1 space-y-2">
          <Input
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/images/example.webp"
            className="h-10 rounded-none border-ink/20 bg-paper font-mono text-xs"
          />
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              size="sm"
              disabled={uploading}
              onClick={() => inputRef.current?.click()}
              className="h-9 rounded-none bg-ink text-cream hover:bg-brand"
            >
              {uploading ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                <Upload className="h-4 w-4" aria-hidden="true" />
              )}
              {uploading ? "UPLOADING…" : "UPLOAD IMAGE"}
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => setPickerOpen((v) => !v)}
              className="h-9 rounded-none border-ink/20 bg-cream hover:bg-cream hover:text-brand"
            >
              <ImagePlus className="h-4 w-4" aria-hidden="true" />
              {pickerOpen ? "HIDE LIBRARY" : "PICK FROM LIBRARY"}
            </Button>
            {value ? (
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => onChange("")}
                className="h-9 rounded-none border-ink/20 bg-cream text-steel hover:bg-cream hover:text-brand"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
                CLEAR
              </Button>
            ) : null}
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void upload(file);
              e.target.value = "";
            }}
          />
          <p className="text-xs text-steel">
            JPG, PNG, WebP or AVIF · up to 5 MB. Uploaded images land in
            /uploads and can be reused anywhere.
          </p>
        </div>
      </div>

      {pickerOpen ? (
        <div className="max-h-64 overflow-y-auto border border-ink/15 bg-paper p-3">
          {library.length === 0 ? (
            <p className="py-4 text-center text-sm text-steel">
              No images found yet — upload one first.
            </p>
          ) : (
            <ul className="grid grid-cols-3 gap-2 sm:grid-cols-5">
              {library.map((src) => (
                <li key={src}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(src);
                      setPickerOpen(false);
                    }}
                    className={`group relative block aspect-square w-full overflow-hidden border-2 transition-colors ${
                      value === src ? "border-brand" : "border-transparent hover:border-ink/30"
                    }`}
                    aria-label={`Use image ${src}`}
                  >
                                  <img
                      src={src}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}
