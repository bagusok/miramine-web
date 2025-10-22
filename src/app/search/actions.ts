"use server";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { z } from "zod";

const searchSchema = z.object({
  query: z.string().nonempty("Query tidak boleh kosong"),
});

type AnimeData = {
  id: string;
  title: string | null;
  status: string | null;
  sub_type: string | null;
  image_url: string | null;
  last_episode: string | null;
  created_at: Date;
};

type State = {
  status: boolean;
  message: string;
  data: AnimeData[] | [];
};

const selectAnime: Prisma.animeSelect = {
  id: true,
  title: true,
  status: true,
  sub_type: true,
  image_url: true,
  last_episode: true,
  created_at: true,
};

export const searchAnime = async (
  prevState: State,
  form: FormData
): Promise<State> => {
  const parse = searchSchema.safeParse({
    query: form.get("query") as string,
  });
  if (!parse.success) {
    return {
      status: false,
      message: parse.error.errors[0].message,
      data: [],
    };
  }

  try {
    const search = await prisma.anime.findMany({
      where: {
        OR: [
          {
            title: {
              contains: parse.data.query,
              mode: "insensitive",
            },
          },
          {
            title_show: {
              contains: parse.data.query,
              mode: "insensitive",
            },
          },
          {
            title_synonym: {
              contains: parse.data.query,
              mode: "insensitive",
            },
          },
        ],
      },
      select: selectAnime,
      take: 20,
    });

    if (search.length === 0) {
      return {
        status: false,
        message: "Anime tidak ditemukan",
        data: [],
      };
    }

    return {
      status: true,
      message: "Data ditemukan",
      data: search,
    };
  } catch (error) {
    console.error(error);
    return {
      status: false,
      message: "Terjadi kesalahan",
      data: [],
    };
  }
};
