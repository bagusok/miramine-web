import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

import type { AnimeStatus, EpisodeHistoryStatus, LikeDislikeType, StreamFormat, StreamProvider, StreamQuality, StreamType, AnimeType, ThirdPartySource, UserRole } from "./enums";

export type anime = {
    id: string;
    title_show: Generated<string>;
    title: Generated<string>;
    title_en: Generated<string>;
    title_id: Generated<string>;
    title_jp: Generated<string>;
    title_synonym: string;
    synopsis: Generated<string>;
    type: Generated<AnimeType>;
    sub_type: Generated<string>;
    mal_id: Generated<number>;
    anilist_id: Generated<number>;
    image_url: string | null;
    description: Generated<string>;
    status: Generated<AnimeStatus>;
    last_episode: Generated<string>;
    created_at: Generated<Timestamp>;
    updated_at: Timestamp;
    views: Generated<number>;
    likes: Generated<number>;
    dislikes: Generated<number>;
    mal_data: Generated<unknown>;
    anilist_data: Generated<unknown>;
};
export type anime_history = {
    id: string;
    last_episode: Generated<string>;
    status: Generated<EpisodeHistoryStatus>;
    anime_id: string;
    user_id: string;
    created_at: Generated<Timestamp>;
    updated_at: Timestamp;
};
export type AnimeToGenres = {
    A: string;
    B: string;
};
export type AnimeToThirdPartyAnimeSource = {
    A: string;
    B: string;
};
export type bookmark = {
    id: string;
    anime_id: string;
    user_id: string;
    created_at: Generated<Timestamp>;
};
export type comments = {
    id: Generated<number>;
    text: string;
    is_deleted: Generated<boolean>;
    user_id: string;
    anime_id: string;
    created_at: Generated<Timestamp>;
    updated_at: Timestamp;
};
export type comments_reply = {
    id: Generated<number>;
    text: string;
    is_deleted: Generated<boolean>;
    user_id: string;
    comment_id: number;
    created_at: Generated<Timestamp>;
    updated_at: Timestamp;
};
export type episode = {
    id: string;
    title: string;
    episode: Generated<string>;
    order: Generated<number>;
    image_url: string | null;
    created_at: Generated<Timestamp>;
    updated_at: Timestamp;
    views: Generated<number>;
    likes: Generated<number>;
    dislikes: Generated<number>;
    anime_id: string;
};
export type episode_history = {
    id: string;
    status: Generated<EpisodeHistoryStatus>;
    episode_duration: Generated<number>;
    watching_duration: Generated<number>;
    order: Generated<number>;
    anime_history_id: string;
    episode_id: string;
    created_at: Generated<Timestamp>;
    updated_at: Timestamp;
};
export type EpisodeToThirdPartyEpisodeSource = {
    A: string;
    B: string;
};
export type genres = {
    id: string;
    name: string;
    created_at: Generated<Timestamp>;
    updated_at: Timestamp;
};
export type like_dislike = {
    id: Generated<number>;
    user_id: string;
    anime_id: string;
    type: LikeDislikeType;
    created_at: Generated<Timestamp>;
    updated_at: Timestamp;
};
export type login_history = {
    id: string;
    device_id: string | null;
    ip_address: string | null;
    user_agent: string | null;
    access_token: string | null;
    access_token_expires_at: Timestamp | null;
    refresh_token: string | null;
    refresh_token_expires_at: Timestamp | null;
    created_at: Generated<Timestamp>;
    updated_at: Timestamp;
    user_id: string;
};
export type notification_token = {
    id: string;
    user_id: string;
    token: string;
    created_at: Generated<Timestamp>;
    updated_at: Timestamp;
};
export type stream_source = {
    id: string;
    title: Generated<string>;
    url: string;
    created_at: Generated<Timestamp>;
    updated_at: Timestamp;
    type: Generated<StreamType>;
    quality: Generated<StreamQuality>;
    provider: Generated<StreamProvider>;
    format: Generated<StreamFormat>;
    episode_id: string;
    is_from: Generated<ThirdPartySource>;
};
export type third_party_anime_source = {
    id: string;
    source: Generated<ThirdPartySource>;
    source_id: string;
};
export type third_party_episode_source = {
    id: string;
    source: Generated<ThirdPartySource>;
    source_id: string;
};
export type users = {
    id: string;
    oauth_id: string;
    name: string;
    email: string;
    avatar: string;
    watch_time: Generated<string>;
    is_verified: Generated<boolean>;
    is_banned: Generated<boolean>;
    device_id: string | null;
    token: string | null;
    created_at: Generated<Timestamp>;
    updated_at: Timestamp;
    role: Generated<UserRole>;
};
export type DB = {
    _AnimeToGenres: AnimeToGenres;
    _AnimeToThirdPartyAnimeSource: AnimeToThirdPartyAnimeSource;
    _EpisodeToThirdPartyEpisodeSource: EpisodeToThirdPartyEpisodeSource;
    anime: anime;
    anime_history: anime_history;
    bookmark: bookmark;
    comments: comments;
    comments_reply: comments_reply;
    episode: episode;
    episode_history: episode_history;
    genres: genres;
    like_dislike: like_dislike;
    login_history: login_history;
    notification_token: notification_token;
    stream_source: stream_source;
    third_party_anime_source: third_party_anime_source;
    third_party_episode_source: third_party_episode_source;
    users: users;
};
