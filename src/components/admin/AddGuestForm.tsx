"use client";

import { useActionState, useRef, useEffect } from "react";
import { addGuestAction, type GuestFormState } from "@/lib/actions/guests";

const initialState: GuestFormState = {};

export function AddGuestForm() {
  const [state, formAction, isPending] = useActionState(addGuestAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) formRef.current?.reset();
  }, [state.success]);

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <label className="flex flex-1 flex-col gap-1">
        <span className="text-xs font-medium text-charcoal/70">Name</span>
        <input
          type="text"
          name="name"
          required
          className="rounded-lg border border-blush-dark px-3 py-2 text-sm outline-none focus:border-rose"
        />
      </label>
      <label className="flex flex-1 flex-col gap-1">
        <span className="text-xs font-medium text-charcoal/70">Phone (optional)</span>
        <input
          type="tel"
          name="phone"
          className="rounded-lg border border-blush-dark px-3 py-2 text-sm outline-none focus:border-rose"
        />
      </label>
      <label className="flex w-28 flex-col gap-1">
        <span className="text-xs font-medium text-charcoal/70">Seats</span>
        <input
          type="number"
          name="seats"
          min={1}
          defaultValue={1}
          className="rounded-lg border border-blush-dark px-3 py-2 text-sm outline-none focus:border-rose"
        />
      </label>
      <button
        type="submit"
        disabled={isPending}
        className="rounded-lg bg-rose-dark px-5 py-2 text-sm font-medium text-white transition hover:bg-rose disabled:opacity-60"
      >
        {isPending ? "Adding..." : "Add Guest"}
      </button>
      {state.error && <p className="text-sm text-rose sm:ml-2">{state.error}</p>}
    </form>
  );
}
