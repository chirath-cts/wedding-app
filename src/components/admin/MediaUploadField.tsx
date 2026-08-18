"use client";

import { useRef, useState } from "react";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import { createUploadUrlAction, confirmUploadAction } from "@/lib/actions/settings";
import type { UploadField } from "@/lib/types";

interface MediaUploadFieldProps {
  field: UploadField;
  label: string;
  hint: string;
  kind: "image" | "audio";
  accept: string;
  initialUrl: string | null;
}

export function MediaUploadField({ field, label, hint, kind, accept, initialUrl }: MediaUploadFieldProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialUrl);
  const [status, setStatus] = useState<"idle" | "uploading" | "error" | "done">("idle");
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setStatus("uploading");
    setError(null);

    try {
      const ext = file.name.split(".").pop() || "bin";
      const signed = await createUploadUrlAction(field, ext);
      if (signed.error || !signed.path || !signed.token || !signed.publicUrl) {
        throw new Error(signed.error || "Could not prepare the upload.");
      }

      const supabase = getSupabaseBrowser();
      const { error: uploadError } = await supabase.storage
        .from("site-assets")
        .uploadToSignedUrl(signed.path, signed.token, file);
      if (uploadError) throw uploadError;

      const confirmed = await confirmUploadAction(field, signed.publicUrl);
      if (confirmed.error) throw new Error(confirmed.error);

      setPreviewUrl(signed.publicUrl);
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="flex flex-col gap-2 rounded-xl border border-blush-dark bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-charcoal">{label}</p>
          <p className="text-xs text-charcoal/60">{hint}</p>
        </div>
        <label className="cursor-pointer rounded-lg bg-rose-dark px-4 py-2 text-xs font-medium text-white transition hover:bg-rose">
          {status === "uploading" ? "Uploading..." : previewUrl ? "Replace" : "Upload"}
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            disabled={status === "uploading"}
            className="hidden"
          />
        </label>
      </div>

      {previewUrl && kind === "image" && (
        // eslint-disable-next-line @next/next/no-img-element -- previewing an arbitrary uploaded URL, not a static site image
        <img
          src={previewUrl}
          alt={label}
          className="h-32 w-full rounded-lg object-cover"
        />
      )}
      {previewUrl && kind === "audio" && (
        <audio controls src={previewUrl} className="w-full" />
      )}
      {!previewUrl && <p className="text-xs text-charcoal/40">Nothing uploaded yet.</p>}

      {status === "done" && <p className="text-xs text-green-700">Saved — live on the site now.</p>}
      {status === "error" && <p className="text-xs text-rose">{error}</p>}
    </div>
  );
}
