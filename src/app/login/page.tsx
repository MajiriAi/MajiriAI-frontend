import { AuthPage } from "@/components/layout/auth-page";

export default function LoginPage() {
  return <AuthPage title="Welcome back" description="Sign in to continue working on your startup." alternateHref="/register" alternateLabel="Create an account" />;
}
