/**
 * @file Floating animation hook based on Simplex Noise.
 * @author Danil Klimov
 * @version 1.0.0
 *
 * **MIT License**
 * **Copyright (c) 2025 Danil Klimov**
 *
 * Full text of the MIT License can be found in the LICENSE file in the root
 * directory of this source code.
 */

import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import { createNoise2D } from "simplex-noise";

const noise2D = createNoise2D();

/**
 * Props for the useFloatingAnimation hook.
 * @typedef {object} UseFloatingAnimationProps
 * @property {RefObject<HTMLDivElement | null>} ref - Reference to the DOM element to animate.
 * @property {number} seedX - Seed for the X-axis noise generator to create unique paths.
 * @property {number} seedY - Seed for the Y-axis noise generator.
 * @property {number} amplitude - Maximum displacement in pixels.
 * @property {boolean} isEnabled - Flag to enable or disable the animation loop.
 * @property {number} [speed] - Speed multiplier for the animation time.
 */
type UseFloatingAnimationProps = {
  ref: RefObject<HTMLDivElement | null>;
  seedX: number;
  seedY: number;
  amplitude: number;
  isEnabled: boolean;
  speed?: number;
};

/**
 * Applies a smooth, chaotic floating animation to an element using Simplex Noise.
 * Uses requestAnimationFrame for performance.
 * @param {UseFloatingAnimationProps} props - Configuration props for the animation.
 */
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