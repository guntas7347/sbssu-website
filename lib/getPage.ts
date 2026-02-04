// import { notFound } from "next/navigation";

// export async function getPage(params: { type: string; dept?: string }) {
//   const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

//   const qs = new URLSearchParams({ type: params.type });
//   if (params.dept) qs.set("dept", params.dept);

//   const res = await fetch(`${base}/api/admin/pages?${qs.toString()}`, {
//     cache: "no-store",
//   });

//   if (!res.ok) return notFound();

//   const page = await res.json();

//   return {
//     page: page.payload,
//     updatedAt: page.updatedAt,
//   };
// }

import { cookies } from "next/headers";
import { notFound, redirect as navigate } from "next/navigation";

type Options = {
  cookie?: boolean;
  redirect?: boolean;
  redirectTo?: string;
  notfound?: boolean;
};

const getPage = async (
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

export default getPage;
