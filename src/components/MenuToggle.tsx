/**
 * @file Menu Toggle Button
 * @author Danil Klimov
 * @version 1.0.0
 *
 * **MIT License**
 * **Copyright (c) 2025 Danil Klimov**
 *
 * Full text of the MIT License can be found in the LICENSE file in the root
 * directory of this source code.
 */

import { motion, type Transition, type Variants } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Props for the MenuToggle component.
 * @typedef {object} MenuToggleProps
 * @property {boolean} isMenuOpen - Indicates if the fullscreen menu is open.
 * @property {() => void} onToggleMenu - Callback function to toggle the menu state.
 */
type MenuToggleProps = {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
};

/**
 * Renders an interactive menu toggle button (burger/cross) with synchronized animations.
 * @param {MenuToggleProps} props - Props for the MenuToggle component.
 * @returns {JSX.Element} The menu toggle button.
 */
export function MenuToggle({ isMenuOpen, onToggleMenu }: MenuToggleProps) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMorphing, setIsMorphing] = useState(false);
  const [isHoverLocked, setIsHoverLocked] = useState(false);

  useEffect(() => {
    const checkMedia = () => {
      const media = window.matchMedia("(min-width: 1728px)");
      setIsDesktop(media.matches);
    };
    checkMedia();
    window.addEventListener("resize", checkMedia);
    return () => window.removeEventListener("resize", checkMedia);
  }, []);

  useEffect(() => {
    setIsMorphing(true);
    setIsHoverLocked(true);
    const timer = setTimeout(() => setIsMorphing(false), 400);
    return () => clearTimeout(timer);
  }, [isMenuOpen]);

  const gapNormal = isDesktop ? 8.5 : 6.5;
  const gapHover = gapNormal + 2;

  const WIDTH_BURGER = 52;
  const WIDTH_CROSS = 42.96;

  const transition: Transition = {
    duration: 0.4,
    ease: [0.4, 0, 0.2, 1] as const,
  };

  const getAnimationState = () => {
    if (isMenuOpen) {
      if (isHovered && !isMorphing && !isHoverLocked) return "openHover";
      return "open";
    } else {
      if (isHovered && !isMorphing && !isHoverLocked) return "hover";
      return "closed";
    }
  };

  const animationState = getAnimationState();

  const targetTop = isMenuOpen
    ? isDesktop
      ? "34px"
      : "20px"
    : isDesktop
    ? "30px"
    : "10px";

  const targetRight = isMenuOpen
    ? isDesktop
      ? "30px"
      : "20px"
    : isDesktop
    ? "60px"
    : "20px";

  const rotationVariants: Variants = {
    closed: { rotate: 0 },
    hover: { rotate: 0 },
    open: { rotate: 0 },
    openHover: { rotate: -90 },
  };

  const topVariants: Variants = {
    closed: { y: -gapNormal, rotate: 0, width: WIDTH_BURGER, opacity: 1 },
    hover: { y: -gapHover, rotate: 0, width: WIDTH_BURGER, opacity: 1 },
    open: { y: 0, rotate: 45, width: WIDTH_CROSS, opacity: 1 },
    openHover: { y: 0, rotate: 45, width: WIDTH_CROSS, opacity: 1 },
  };

  const centerVariants: Variants = {
    closed: { scaleX: 1, opacity: 1, width: WIDTH_BURGER },
    hover: { scaleX: 1, opacity: 1, width: WIDTH_BURGER },
    open: { scaleX: 0, opacity: 0, width: WIDTH_CROSS },
    openHover: { scaleX: 0, opacity: 0, width: WIDTH_CROSS },
  };

  const bottomVariants: Variants = {
    closed: { y: gapNormal, rotate: 0, width: WIDTH_BURGER, opacity: 1 },
    hover: { y: gapHover, rotate: 0, width: WIDTH_BURGER, opacity: 1 },
    open: { y: 0, rotate: -45, width: WIDTH_CROSS, opacity: 1 },
    openHover: { y: 0, rotate: -45, width: WIDTH_CROSS, opacity: 1 },
  };

  const sizeClasses = isMenuOpen
    ? "w-[46px] h-[46px]"
    : "w-9 h-9 tablet:w-12 tablet:h-12 desktop:w-15 desktop:h-15";

  return (
    <div className="fixed inset-0 z-60 pointer-events-none flex justify-center w-full h-0 overflow-visible">
      <div className="w-full max-w-desktop mx-auto relative h-0">
        <motion.button
          type="button"
          initial={false}
          animate={{
            top: targetTop,
            right: targetRight,
          }}
          transition={transition}
          onClick={onToggleMenu}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setIsHoverLocked(false);
          }}
          className={`
            absolute pointer-events-auto
            flex items-center justify-center
            ${sizeClasses}
            overflow-hidden
          `}
        >
          <motion.div
            className="relative w-full h-full flex items-center justify-center"
            animate={animationState}
            variants={rotationVariants}
            transition={transition}
          >
            <motion.span
              variants={topVariants}
              transition={transition}
              className={`absolute h-[2.3px] rounded-full ${
                isMenuOpen ? "bg-white" : "bg-black"
              }`}
            />

            <motion.span
              variants={centerVariants}
              transition={transition}
              className={`absolute h-[2.3px] rounded-full ${
                isMenuOpen ? "bg-white" : "bg-black"
              }`}
            />

            <motion.span
              variants={bottomVariants}
              transition={transition}
              className={`absolute h-[2.3px] rounded-full ${
                isMenuOpen ? "bg-white" : "bg-black"
              }`}
            />
          </motion.div>
        </motion.button>
      </div>
    </div>
  );
}