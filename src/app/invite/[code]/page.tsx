import { InvitationExperience } from "@/components/invitation/InvitationExperience";
import { getGuestByInviteCode } from "@/lib/data/guests";
import { getSiteSettings } from "@/lib/data/settings";

export default async function InvitePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const [guest, settings] = await Promise.all([
    getGuestByInviteCode(code),
    getSiteSettings(),
  ]);
  return <InvitationExperience guest={guest} settings={settings} />;
}
