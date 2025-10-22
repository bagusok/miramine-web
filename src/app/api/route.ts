import { db } from "@/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  const anime = await db
    .selectFrom("anime")
    .select(["id", "title", "type"])
    .limit(10)
    .offset(0)
    .orderBy("created_at", "desc")
    .execute();

  return NextResponse.json(anime);
};
