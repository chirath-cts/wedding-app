import { LoginForm } from "@/components/admin/LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-blush px-6">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-center font-serif text-2xl text-rose-dark">Admin Login</h1>
        <p className="mt-1 text-center text-sm text-charcoal/60">
          Enter the admin password to manage guests and RSVPs.
        </p>
        <LoginForm />
      </div>
    </div>
  );
}
