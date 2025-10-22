export const AnimeStatus = {
    ONGOING: "ONGOING",
    COMPLETED: "COMPLETED",
    NOT_YET_RELEASED: "NOT_YET_RELEASED",
    CANCELLED: "CANCELLED"
} as const;
export type AnimeStatus = (typeof AnimeStatus)[keyof typeof AnimeStatus];
export const EpisodeHistoryStatus = {
    WATCHING: "WATCHING",
    COMPLETED: "COMPLETED",
    DROPPED: "DROPPED",
    PAUSED: "PAUSED"
} as const;
export type EpisodeHistoryStatus = (typeof EpisodeHistoryStatus)[keyof typeof EpisodeHistoryStatus];
export const LikeDislikeType = {
    LIKE: "LIKE",
    DISLIKE: "DISLIKE"
} as const;
export type LikeDislikeType = (typeof LikeDislikeType)[keyof typeof LikeDislikeType];
export const StreamFormat = {
    MP4: "MP4",
    MKV: "MKV",
    AVI: "AVI",
    FLV: "FLV",
    MOV: "MOV",
    WMV: "WMV",
    WEBM: "WEBM",
    M3U8: "M3U8",
    MPD: "MPD",
    HLS: "HLS",
    DASH: "DASH",
    OTHER: "OTHER"
} as const;
export type StreamFormat = (typeof StreamFormat)[keyof typeof StreamFormat];
export const StreamProvider = {
    PIXELDRAIN: "PIXELDRAIN",
    MIXDROP: "MIXDROP",
    RAPIDVIDEO: "RAPIDVIDEO",
    MP4UPLOAD: "MP4UPLOAD",
    UPTOSTREAM: "UPTOSTREAM",
    KRAKENFILES: "KRAKENFILES",
    STREAMSB: "STREAMSB",
    DAILYMOTION: "DAILYMOTION",
    YOUTUBE: "YOUTUBE",
    DIRECT: "DIRECT",
    EXAFILES: "EXAFILES",
    MYSTORAGEINDO: "MYSTORAGEINDO",
    GOOGLEDRIVE: "GOOGLEDRIVE",
    MEGA: "MEGA",
    R2: "R2",
    OTHER: "OTHER",
    BACKUP: "BACKUP"
} as const;
export type StreamProvider = (typeof StreamProvider)[keyof typeof StreamProvider];
export const StreamQuality = {
    LOW: "LOW",
    MEDIUM: "MEDIUM",
    HIGH: "HIGH",
    HD: "HD",
    FULLHD: "FULLHD",
    ULTRAHD: "ULTRAHD",
    UNKNOWN: "UNKNOWN"
} as const;
export type StreamQuality = (typeof StreamQuality)[keyof typeof StreamQuality];
export const StreamType = {
    EMBED: "EMBED",
    DIRECT: "DIRECT"
} as const;
export type StreamType = (typeof StreamType)[keyof typeof StreamType];
export const AnimeType = {
    ANIME: "ANIME",
    DONGHUA: "DONGHUA",
    OTHER: "OTHER"
} as const;
export type AnimeType = (typeof AnimeType)[keyof typeof AnimeType];
export const ThirdPartySource = {
    ANIMEPLAY: "ANIMEPLAY",
    DONGHUB: "DONGHUB",
    KURONIME: "KURONIME",
    ANIMEIN: "ANIMEIN",
    WIBUKU: "WIBUKU",
    ANIMEINDO: "ANIMEINDO",
    OTHER: "OTHER"
} as const;
export type ThirdPartySource = (typeof ThirdPartySource)[keyof typeof ThirdPartySource];
export const UserRole = {
    USER: "USER",
    ADMIN: "ADMIN"
} as const;
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
