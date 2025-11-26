// app/api/revalidate/route.ts
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  const { secret, path } = await req.json();

  if (secret !== process.env.REVALIDATE_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  revalidatePath(path);
  return new Response(`Revalidated ${path}`, { status: 200 });
}
