export function buildInviteUrl(inviteCode: string): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return `${base.replace(/\/$/, "")}/invite/${inviteCode}`;
}

export function buildWhatsappShareLink(guestName: string, inviteUrl: string): string {
  const message = `Dear ${guestName}, you're warmly invited to our wedding! 💍 Please view your personal invitation and let us know if you can make it: ${inviteUrl}`;
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}
