import { redirect } from "next/navigation";
import Link from "next/link";
import { isAdminAuthenticated, logoutAction } from "@/lib/actions/auth";

// Force this whole admin section to be evaluated fresh on every request.
// Without this, Next.js can decide at build time (when ADMIN_PASSWORD may
// not be set yet) that this route never reads dynamic data, and cache a
// static redirect to /admin/login — which would then ignore real logins
// after deployment.
export const dynamic = "force-dynamic";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-ivory">
      <header className="flex items-center justify-between border-b border-blush-dark bg-white px-6 py-4">
        <div className="flex items-center gap-6">
          <span className="font-serif text-lg text-rose-dark">Wedding Admin</span>
          <nav className="flex gap-4 text-sm font-medium text-charcoal/70">
            <Link href="/admin" className="transition hover:text-rose-dark">
              Dashboard
            </Link>
            <Link href="/admin/guests" className="transition hover:text-rose-dark">
              Guests
            </Link>
          </nav>
        </div>
        <form action={logoutAction}>
          <button type="submit" className="text-sm text-charcoal/60 hover:text-rose">
            Log out
          </button>
        </form>
      </header>
      <main className="px-6 py-8">{children}</main>
    </div>
  );
}
