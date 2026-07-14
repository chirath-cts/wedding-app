import type { Guest } from "@/lib/types";
import { buildInviteUrl, buildWhatsappShareLink } from "@/lib/utils/whatsapp";
import { CopyLinkButton } from "./CopyLinkButton";
import { DeleteGuestButton } from "./DeleteGuestButton";

const statusStyles: Record<Guest["rsvp_status"], string> = {
  attending: "bg-green-100 text-green-700",
  declined: "bg-red-100 text-red-700",
  pending: "bg-gold-light/60 text-charcoal/70",
};

export function GuestTable({ guests }: { guests: Guest[] }) {
  return (
    <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
      <table className="w-full min-w-[700px] text-left text-sm">
        <thead className="border-b border-blush-dark text-xs uppercase tracking-wide text-charcoal/50">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Seats</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Table #</th>
            <th className="px-4 py-3">Wish</th>
            <th className="px-4 py-3">Invite Link</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest) => {
            const inviteUrl = guest.invite_code ? buildInviteUrl(guest.invite_code) : null;
            const whatsappUrl = inviteUrl
              ? buildWhatsappShareLink(guest.name, inviteUrl)
              : null;

            return (
              <tr key={guest.id} className="border-b border-blush/60 last:border-0">
                <td className="px-4 py-3 font-medium text-charcoal">
                  {guest.name}
                  {guest.phone && (
                    <div className="text-xs text-charcoal/50">{guest.phone}</div>
                  )}
                </td>
                <td className="px-4 py-3">{guest.seats_invited}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[guest.rsvp_status]}`}
                  >
                    {guest.rsvp_status}
                  </span>
                </td>
                <td className="px-4 py-3 text-charcoal/50">{guest.table_number ?? "—"}</td>
                <td className="max-w-[200px] truncate px-4 py-3 text-charcoal/70" title={guest.wish_message ?? ""}>
                  {guest.wish_message ?? "—"}
                </td>
                <td className="px-4 py-3">
                  {inviteUrl ? (
                    <div className="flex items-center gap-2">
                      <CopyLinkButton url={inviteUrl} />
                      <a
                        href={whatsappUrl!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-md border border-blush-dark px-2.5 py-1 text-xs font-medium text-green-700 transition hover:bg-blush"
                      >
                        WhatsApp
                      </a>
                    </div>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="px-4 py-3">
                  <DeleteGuestButton id={guest.id} />
                </td>
              </tr>
            );
          })}
          {guests.length === 0 && (
            <tr>
              <td colSpan={7} className="px-4 py-8 text-center text-charcoal/50">
                No guests yet — add your first guest above.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
