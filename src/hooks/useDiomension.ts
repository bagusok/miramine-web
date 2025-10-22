import { useEffect, useState, RefObject } from "react";
import ReactPlayer from "react-player";

interface VideoDimensions {
  videoWidth: number;
  videoHeight: number;
  containerWidth: number;
  containerHeight: number;
  wrapperWidth: number;
  wrapperHeight: number;
  videoTop: number;
  videoLeft: number;
  isFullscreen: boolean;
}

export const useVideoDimensions = (
  playerRef: RefObject<ReactPlayer | null>,
  containerRef: RefObject<HTMLDivElement | null>,
  wrapperRef: RefObject<HTMLDivElement | null>
): VideoDimensions => {
  const [dimensions, setDimensions] = useState<VideoDimensions>({
    videoWidth: 0,
    videoHeight: 0,
    containerWidth: 0,
    containerHeight: 0,
    wrapperWidth: 0,
    wrapperHeight: 0,
    videoTop: 0,
    videoLeft: 0,
    isFullscreen: false,
  });

  useEffect(() => {
    const calculateDimensions = () => {
      if (!containerRef.current || !wrapperRef.current) return;

      const container = containerRef.current;
      const wrapper = wrapperRef.current;
      const isFullscreen = !!document.fullscreenElement;

      // Get container dimensions
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;

      // Calculate video dimensions maintaining 16:9 aspect ratio
      let videoWidth = containerWidth;
      let videoHeight = (containerWidth * 9) / 16;

      // If video height exceeds container height, scale down based on height
      if (videoHeight > containerHeight) {
        videoHeight = containerHeight;
        videoWidth = (containerHeight * 16) / 9;
      }

      // Calculate video position for centering
      const videoTop = (containerHeight - videoHeight) / 2;
      const videoLeft = (containerWidth - videoWidth) / 2;

      // Get actual wrapper dimensions
      const wrapperWidth = wrapper.clientWidth;
      const wrapperHeight = wrapper.clientHeight;

      setDimensions({
        videoWidth,
        videoHeight,
        containerWidth,
        containerHeight,
        wrapperWidth,
        wrapperHeight,
        videoTop,
        videoLeft,
        isFullscreen,
      });
    };

    // Calculate initial dimensions
    calculateDimensions();

    // Watch for resize events
    const resizeObserver = new ResizeObserver(calculateDimensions);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Watch for fullscreen changes
    const handleFullscreenChange = () => {
      calculateDimensions();
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    // Watch for orientation changes on mobile
    const handleOrientationChange = () => {
      calculateDimensions();
    };
    window.addEventListener("orientationchange", handleOrientationChange);

    // Force recalculation after a small delay to handle any initial rendering delays
    const initialTimer = setTimeout(calculateDimensions, 100);

    return () => {
      resizeObserver.disconnect();
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      window.removeEventListener("orientationchange", handleOrientationChange);
      clearTimeout(initialTimer);
    };
  }, [containerRef, wrapperRef, playerRef]);

  return dimensions;
};
