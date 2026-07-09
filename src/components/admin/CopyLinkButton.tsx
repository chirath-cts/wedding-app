"use client";

import { useState } from "react";

export function CopyLinkButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="rounded-md border border-blush-dark px-2.5 py-1 text-xs font-medium text-rose-dark transition hover:bg-blush"
    >
      {copied ? "Copied!" : "Copy Link"}
    </button>
  );
}
