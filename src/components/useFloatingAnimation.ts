import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import { createNoise2D } from "simplex-noise";

const noise2D = createNoise2D();

type UseFloatingAnimationProps = {
  ref: RefObject<HTMLDivElement | null>;
  seedX: number;
  seedY: number;
  amplitude: number;
  isEnabled: boolean;
  speed?: number;
};

export function useFloatingAnimation({
  ref,
  seedX,
  seedY,
  amplitude,
  isEnabled,
  speed = 0.00006,
}: UseFloatingAnimationProps) {
  const animationFrameId = useRef<number | null>(null);
  const startTime = useRef(performance.now());

  useEffect(() => {
    const element = ref.current;

    if (!element || !isEnabled) {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
      return;
    }

    const animate = (currentTime: number) => {
      const time = (currentTime - startTime.current) * speed;

      const noiseX = noise2D(time, seedX);
      const noiseY = noise2D(time, seedY);
      const offsetX = noiseX * amplitude;
      const offsetY = noiseY * amplitude;

      element.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      animationFrameId.current = requestAnimationFrame(animate);
    };

    startTime.current = performance.now();
    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [ref, seedX, seedY, amplitude, isEnabled, speed]);
}