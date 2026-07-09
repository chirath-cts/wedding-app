"use client";

import { useTransition } from "react";
import { deleteGuestAction } from "@/lib/actions/guests";

export function DeleteGuestButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        if (confirm("Remove this guest?")) {
          startTransition(() => {
            deleteGuestAction(id);
          });
        }
      }}
      className="rounded-md border border-blush-dark px-2.5 py-1 text-xs font-medium text-charcoal/60 transition hover:bg-blush hover:text-rose disabled:opacity-60"
    >
      {isPending ? "..." : "Delete"}
    </button>
  );
}
