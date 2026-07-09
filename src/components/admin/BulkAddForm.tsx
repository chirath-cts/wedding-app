"use client";

import { useActionState, useRef, useEffect } from "react";
import { bulkAddGuestsAction, type BulkAddFormState } from "@/lib/actions/guests";

const initialState: BulkAddFormState = {};

export function BulkAddForm() {
  const [state, formAction, isPending] = useActionState(bulkAddGuestsAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.addedCount) formRef.current?.reset();
  }, [state.addedCount]);

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-3">
      <label className="flex flex-col gap-1">
        <span className="text-xs font-medium text-charcoal/70">
          Paste names, one per line
        </span>
        <textarea
          name="names"
          rows={5}
          placeholder={"Kamal Perera\nNimali Silva\nRohan Fernando"}
          className="rounded-lg border border-blush-dark px-3 py-2 text-sm outline-none focus:border-rose"
        />
      </label>
      <div className="flex items-end gap-3">
        <label className="flex w-40 flex-col gap-1">
          <span className="text-xs font-medium text-charcoal/70">Default seats each</span>
          <input
            type="number"
            name="defaultSeats"
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
          {isPending ? "Adding..." : "Bulk Add"}
        </button>
        {state.error && <p className="text-sm text-rose">{state.error}</p>}
        {state.addedCount ? (
          <p className="text-sm text-rose-dark">Added {state.addedCount} guests.</p>
        ) : null}
      </div>
    </form>
  );
}
