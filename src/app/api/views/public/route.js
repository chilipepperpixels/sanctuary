import { getPublicViewStats } from "@/app/lib/viewCounter";

export const runtime = "nodejs";

export async function GET() {
  return Response.json(await getPublicViewStats());
}
