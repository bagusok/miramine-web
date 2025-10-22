import { IMalData } from "@/lib/prisma";
import { StreamFormat, StreamQuality } from "./enums";

export type EpisodeResult = {
  anime_id: number;
  episode_id: number;
  anime_title: string;
  episode_title: string;
  image_url: string;
  episode: number;
  mal_data: IMalData;
  created_at: Date;
};

export type StreamSourceSelect = {
  id: string;
  quality: StreamQuality;
  format: StreamFormat;
  url: string;
  created_at: Date;
};
