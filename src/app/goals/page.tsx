import { AppShell } from "@/components/layout/app-shell";
import { ResourcePage } from "@/components/resource-page";

export default function GoalsPage() {
  return (
    <AppShell>
      <ResourcePage kind="goals" title="Goals" description="Turn your strategy into clear, trackable outcomes." />
    </AppShell>
  );
}
