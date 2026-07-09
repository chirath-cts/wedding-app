"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "@/lib/actions/auth";

const initialState: LoginState = {};

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="mt-6 flex flex-col gap-4">
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-charcoal/80">Password</span>
        <input
          type="password"
          name="password"
          required
          autoFocus
          className="rounded-lg border border-blush-dark px-4 py-2.5 outline-none focus:border-rose"
        />
      </label>

      {state.error && <p className="text-sm text-rose">{state.error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-full bg-rose-dark px-6 py-3 text-sm font-medium text-white shadow transition hover:bg-rose disabled:opacity-60"
      >
        {isPending ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
