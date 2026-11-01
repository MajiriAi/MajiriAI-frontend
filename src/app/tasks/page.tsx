import { AppShell } from "@/components/layout/app-shell";
import { ResourcePage } from "@/components/resource-page";

export default function TasksPage() {
  return (
    <AppShell>
      <ResourcePage kind="tasks" title="Tasks" description="Capture the work that moves your startup forward." />
    </AppShell>
  );
}
