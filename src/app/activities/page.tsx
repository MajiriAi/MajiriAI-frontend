import { AppShell } from "@/components/layout/app-shell";
import { ResourcePage } from "@/components/resource-page";

export default function ActivitiesPage() {
  return (
    <AppShell>
      <ResourcePage kind="activities" title="Activities" description="Review the progress and decisions that shape your week." />
    </AppShell>
  );
}
