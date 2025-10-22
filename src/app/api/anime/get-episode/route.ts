import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const anime_id = await req.nextUrl.searchParams.get("anime_id");
  if (!anime_id) {
    return NextResponse.json(
      { status: false, message: "id is required" },
      {
        status: 400,
      }
    );
  }

  const episode = await db
    .selectFrom("episode")
    .select(["id", "title", "episode", "views", "order", "created_at"])
    .where("anime_id", "=", anime_id)
    .orderBy("order", "desc")
    .execute();

  return NextResponse.json(
    {
      status: true,
      data: episode,
    },
    { status: 200 }
  );
};
