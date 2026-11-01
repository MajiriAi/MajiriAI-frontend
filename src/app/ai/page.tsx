import { AppShell } from "@/components/layout/app-shell";
import { CopilotChat } from "@/components/copilot-chat";

export default function AiPage() {
  return (
    <AppShell fullHeight>
      <CopilotChat />
    </AppShell>
  );
}
