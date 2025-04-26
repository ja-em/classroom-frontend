import { LoginForm } from "@/components/login-form";
import { MenuLinkEnum } from "@/constants/menu";
import { verifySession } from "@/lib/auth";

import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await verifySession();
  if (session) {
    redirect(MenuLinkEnum.CLASSROOM);
  }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  );
}
