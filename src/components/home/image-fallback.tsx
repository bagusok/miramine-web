"use client";
import { useState } from "react";
import Image, { ImageProps } from "next/image";

export default function ImageFallback({
  src,
  alt,
  fallbackSrc,
  width,
  height,
  ...props
}: {
  src: string;
  alt: string;
  fallbackSrc: string;
  width: number;
  height: number;
} & ImageProps) {
  const [imageSrc, setImageSrc] = useState(src);

  const handleError = () => {
    setImageSrc(fallbackSrc);
  };

  return (
    <Image
      {...props}
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      onError={handleError}
    />
  );
}
