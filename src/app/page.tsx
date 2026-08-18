import { InvitationExperience } from "@/components/invitation/InvitationExperience";
import { getSiteSettings } from "@/lib/data/settings";

export default async function Home() {
  const settings = await getSiteSettings();
  return <InvitationExperience guest={null} settings={settings} />;
}
