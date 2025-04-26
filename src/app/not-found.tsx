import { MenuLinkEnum } from "@/constants/menu";
import { verifySession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function NotFoundPage() {
  const session = await verifySession();
  if (session) {
    return redirect(MenuLinkEnum.CLASSROOM);
  }
  return redirect("/login");
}
