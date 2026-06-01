import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { LoginPanel } from "@/components/login-panel";
import { authOptions, getAdminCredentials } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/mission-control");
  }

  const credentials = getAdminCredentials();

  return (
    <LoginPanel
      devMode={credentials.isDevFallback}
      devEmail={credentials.email}
      devPassword={credentials.password}
    />
  );
}
