import { cookies } from "next/headers";
import { notFound, redirect as navigate } from "next/navigation";

type Options = {
  cookie?: boolean;
  redirect?: boolean;
  redirectTo?: string;
  notfound?: boolean;
};

type PageResult<T = any> = {
  page: T;
  updatedAt: string;
};

const getPage = async <T = any>(
  dept: string,
  pageKey: string,
  {
    cookie = false,
    redirect = false,
    redirectTo = "/",
    notfound = true,
  }: Options = {},
): Promise<PageResult<T>> => {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  let token = "";

  if (cookie) {
    const cookieStore = await cookies();
    token = cookieStore.get("token")?.value || "";
  }

  const res = await fetch(`${base}/api/page/${dept}/${pageKey}`, {
    cache: "no-store",
    credentials: "include",
    headers: cookie ? { Cookie: `token=${token}` } : {},
  });

  if (!res.ok) {
    if (redirect) navigate(redirectTo);
    if (notfound) notFound();
    throw new Error("Page fetch failed");
  }

  const json = await res.json();

  return {
    page: json.payload,
    updatedAt: json.payload.updatedAt,
  };
};

export default getPage;
