import { InvitationExperience } from "@/components/invitation/InvitationExperience";
import { getGuestByInviteCode } from "@/lib/data/guests";

export default async function InvitePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const guest = await getGuestByInviteCode(code);
  return <InvitationExperience guest={guest} />;
}
