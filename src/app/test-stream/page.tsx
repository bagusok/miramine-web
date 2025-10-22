"use client";

import React, { useEffect, useRef, useState } from "react";

import {
  LoaderCircle,
  Maximize,
  Pause,
  Play,
  Settings,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import ReactPlayer from "react-player";

const ReactPlayers = dynamic(() => import("react-player/lazy"), { ssr: false });

export default function VideoPlayer() {
  return <CustomVideoPlayer watermark="" thumbnail="" url="" />;
}
interface CustomVideoPlayerProps {
  url: string;
  thumbnail?: string;
  watermark?: string;
  title?: string;
  episode?: string;
}

const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = ({
  url,
  thumbnail,
  title,
  episode,
  watermark,
}) => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [isBuffering, setIsBuffering] = useState(false);
  const [, setIsError] = useState(false);
  const [seeking, setSeeking] = useState(false);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [showThumbnail, setShowThumbnail] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const playerRef = useRef<ReactPlayer>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const playerWrapperRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<number | null>(null);
  const lastTapRef = useRef<{ time: number; x: number } | null>(null);
  const skipAmount = 10;

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      if (controlsTimeoutRef.current) {
        window.clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  const handleDoubleTap = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const currentTime = new Date().getTime();
    const x = touch.clientX;
    const containerWidth = playerContainerRef.current?.offsetWidth || 0;
    const tapArea = x / containerWidth;

    if (
      lastTapRef.current &&
      currentTime - lastTapRef.current.time < 300 &&
      Math.abs(x - lastTapRef.current.x) < 30
    ) {
      if (tapArea < 0.3) {
        handleSkipBackward();
      } else if (tapArea > 0.7) {
        handleSkipForward();
      }
      lastTapRef.current = null;
    } else {
      lastTapRef.current = { time: currentTime, x };
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      window.clearTimeout(controlsTimeoutRef.current);
    }
    if (!seeking) {
      controlsTimeoutRef.current = window.setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  const handleMouseLeave = () => {
    if (!seeking) {
      setShowControls(false);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    handleDoubleTap(e);
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      window.clearTimeout(controlsTimeoutRef.current);
    }
    if (!seeking) {
      controlsTimeoutRef.current = window.setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  const handlePlayPause = () => {
    if (!playing) {
      setShowThumbnail(false);
    }
    setPlaying(!playing);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  const handleToggleMute = () => {
    setMuted(!muted);
  };

  const handleProgress = (state: { played: number }) => {
    if (!seeking) {
      setPlayed(state.played);
    }
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayed(parseFloat(e.target.value));
  };

  const handleSeekMouseDown = () => {
    setSeeking(true);
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      window.clearTimeout(controlsTimeoutRef.current);
    }
  };

  const handleSeekMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
    handleSeekEnd((e.target as HTMLInputElement).value);
  };

  const handleSeekTouchEnd = (e: React.TouchEvent<HTMLInputElement>) => {
    handleSeekEnd((e.target as HTMLInputElement).value);
  };

  const handleSeekEnd = (value: string) => {
    setSeeking(false);
    if (playerRef.current) {
      playerRef.current.seekTo(parseFloat(value));
    }
    controlsTimeoutRef.current = window.setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  const handleFullscreen = () => {
    if (playerContainerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        playerContainerRef.current.requestFullscreen();
      }
    }
  };

  const formatTime = (seconds: number) => {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, "0");
    if (hh) {
      return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
    }
    return `${mm}:${ss}`;
  };

  const handleSkipBackward = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(
        Math.max(0, playerRef.current.getCurrentTime() - skipAmount)
      );
    }
  };

  const handleSkipForward = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(
        Math.min(duration, playerRef.current.getCurrentTime() + skipAmount)
      );
    }
  };

  return (
    <div
      ref={playerContainerRef}
      className={`relative bg-black rounded-lg overflow-hidden shadow-xl ${
        isFullscreen
          ? "flex items-center justify-center w-screen h-screen"
          : "w-full max-w-4xl mx-auto"
      }`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
    >
      {thumbnail && showThumbnail && !playing && (
        <div
          className="absolute inset-0 bg-cover bg-center z-30 flex items-center justify-center "
          style={{ backgroundImage: `url(${thumbnail})` }}
        >
          <button
            onClick={handlePlayPause}
            className="bg-blue-500/80 hover:bg-blue-600/80 text-white rounded-full p-6 transition-colors"
          >
            <Play size={32} />
          </button>
        </div>
      )}

      <div
        ref={playerWrapperRef}
        className={`relative ${
          isFullscreen ? "w-full h-auto aspect-video" : "w-full"
        }`}
      >
        <ReactPlayers
          ref={playerRef}
          url={url}
          width="100%"
          height="100%"
          playing={playing}
          volume={volume}
          muted={muted}
          onProgress={handleProgress}
          onDuration={setDuration}
          onBuffer={() => setIsBuffering(true)}
          onBufferEnd={() => setIsBuffering(false)}
          onError={(e) => {
            console.error(e);
            setIsError(true);
          }}
          style={{ backgroundColor: "black" }}
        />

        {/* Watermark */}
        {watermark && (
          <Image
            src={watermark}
            alt="wm"
            width={100}
            height={50}
            className="absolute top-4 right-4 z-10 pointer-events-none w-[5%] "
          />
        )}
      </div>

      {/* Header Item */}
      <div
        className={`overflow-hidden absolute top-0 left-0 right-0 z-20 w-full flex gap-2 justify-between bg-gradient-to-b from-black/90 p-4 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex w-2/3 gap-2">
          {title && (
            <h2 className="font-medium line-clamp-1 h-fit text-lg">{title}</h2>
          )}
          {title && episode && <span> - </span>}
          {episode && (
            <h2 className="font-medium overflow-clip shrink-0 text-lg">
              {episode}
            </h2>
          )}
        </div>
        <Settings size={20} />
      </div>

      {/* Play Pause */}
      <div className="absolute inset-y-0 left-0 w-full bg-black/0 flex items-center justify-center">
        {!isBuffering && (
          <button
            onClick={() => handlePlayPause()}
            className={`bg-black/50 rounded-full p-4 transition-opacity duration-200 hover:opacity-70 ${
              showControls ? "opacity-30" : "opacity-0"
            }`}
          >
            {playing ? <Pause size={32} /> : <Play size={32} />}
          </button>
        )}

        {isBuffering && (
          <LoaderCircle size={32} className="animate-spin duration-1000" />
        )}
      </div>

      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Progress Bar */}
        <input
          type="range"
          min={0}
          max={0.999999}
          step="any"
          value={played}
          onMouseDown={handleSeekMouseDown}
          onChange={handleSeekChange}
          onMouseUp={handleSeekMouseUp}
          onTouchStart={handleSeekMouseDown}
          onTouchEnd={handleSeekTouchEnd}
          className="w-full h-1 mb-4 appearance-none bg-gray-600 rounded-lg cursor-pointer"
          style={{
            background: `linear-gradient(to right, #3b82f6 ${
              played * 100
            }%, #4b5563 ${played * 100}%)`,
          }}
        />

        <div className="flex items-center justify-between text-white">
          <div className="flex items-center space-x-4">
            {/* Play/Pause Button */}
            {!isBuffering && (
              <button
                onClick={handlePlayPause}
                className="hover:text-blue-500 transition-colors"
              >
                {playing ? <Pause size={24} /> : <Play size={24} />}
              </button>
            )}

            {isBuffering && (
              <LoaderCircle size={24} className="animate-spin duration-1000" />
            )}

            {/* Skip Buttons */}
            <button
              onClick={handleSkipBackward}
              className="hover:text-blue-500 transition-colors"
            >
              <SkipBack size={20} />
            </button>

            <button
              onClick={handleSkipForward}
              className="hover:text-blue-500 transition-colors"
            >
              <SkipForward size={20} />
            </button>

            {/* Volume Controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handleToggleMute}
                className="hover:text-blue-500 transition-colors"
              >
                {muted || volume === 0 ? (
                  <VolumeX size={20} />
                ) : (
                  <Volume2 size={20} />
                )}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.1}
                value={volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 appearance-none bg-gray-600 rounded-lg cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #3b82f6 ${
                    volume * 100
                  }%, #4b5563 ${volume * 100}%)`,
                }}
              />
            </div>

            {/* Time Display */}
            <div className="text-sm">
              {formatTime(played * duration)} / {formatTime(duration)}
            </div>
          </div>

          {/* Fullscreen Button */}
          <button
            onClick={handleFullscreen}
            className="hover:text-blue-500 transition-colors"
          >
            <Maximize size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
