import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function RootPage() {
  const h = await headers();
  const accept = h.get("accept-language") ?? "";
  const locale = accept.toLowerCase().startsWith("ru") ? "ru" : "en";
  redirect(`/${locale}`);
}
