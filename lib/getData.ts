import { cookies } from "next/headers";
import { notFound, redirect as navigate } from "next/navigation";

type Options = {
  cookie?: boolean;
  redirect?: boolean;
  redirectTo?: string;
  notfound?: boolean;
};

const getData = async (
  url = "",
  {
    cookie = false,
    redirect = false,
    redirectTo = "/",
    notfound = true,
  }: Options = {},
) => {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  let token = "";

  if (cookie) {
    const cookieStore = await cookies();
    token = cookieStore.get("token")?.value || "";
  }

  const res = await fetch(`${base}/api/${url}`, {
    cache: "no-store",
    credentials: "include",
    headers: cookie ? { Cookie: `token=${token}` } : {},
  });

  if (!res.ok) {
    if (redirect) return navigate(redirectTo);
    if (notfound) return notFound();
    return { code: 404, message: "Not Found", payload: null };
  }

  return res.json();
};

export default getData;
