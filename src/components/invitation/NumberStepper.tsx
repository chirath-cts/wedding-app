"use client";

import { useState } from "react";

// A +/- stepper that submits its value through a hidden input. Far easier
// to use on a phone than a bare number field.
export function NumberStepper({
  name,
  label,
  min = 0,
  max = 20,
  defaultValue = 0,
}: {
  name: string;
  label: string;
  min?: number;
  max?: number;
  defaultValue?: number;
}) {
  const [value, setValue] = useState(defaultValue);

  const buttonClass =
    "flex h-10 w-10 items-center justify-center rounded-full border border-blush-dark bg-white text-lg font-medium text-rose-dark transition hover:bg-blush active:scale-95 disabled:opacity-40 disabled:hover:bg-white";

  return (
    <div className="flex flex-1 flex-col justify-end gap-1.5">
      <span className="text-sm font-medium text-charcoal/80">{label}</span>
      <div className="flex items-center justify-between rounded-2xl border border-blush-dark bg-white px-2 py-1.5">
        <button
          type="button"
          aria-label={`Decrease ${label}`}
          onClick={() => setValue((v) => Math.max(min, v - 1))}
          disabled={value <= min}
          className={buttonClass}
        >
          −
        </button>
        <span className="min-w-8 text-center font-serif text-xl text-charcoal tabular-nums">
          {value}
        </span>
        <button
          type="button"
          aria-label={`Increase ${label}`}
          onClick={() => setValue((v) => Math.min(max, v + 1))}
          disabled={value >= max}
          className={buttonClass}
        >
          +
        </button>
      </div>
      <input type="hidden" name={name} value={value} />
    </div>
  );
}
