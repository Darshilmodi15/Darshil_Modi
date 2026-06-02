import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/admin-dashboard";
import { authOptions } from "@/lib/auth";
import { getDashboardMetrics } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function MissionControlPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/mission-control/login");
  }

  const metrics = await getDashboardMetrics();

  return <AdminDashboard metrics={metrics} />;
}
