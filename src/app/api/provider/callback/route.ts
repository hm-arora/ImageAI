import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body: { status: string; request_id: string } = await req.json();
  if (body.status === "OK" && body.request_id) {
    console.log("===================================");
    console.log(body);
    console.log("===================================");
  }

  return NextResponse.json({ success: true });
}
