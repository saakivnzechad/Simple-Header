/**
 * @file Fullscreen menu component and its sub-components.
 * @author Danil Klimov
 * @version 1.0.0
 *
 * **MIT License**
 * **Copyright (c) 2025 Danil Klimov**
 *
 * Full text of the MIT License can be found in the LICENSE file in the root
 * directory of this source code.
 */

import { useEffect, useState, useRef } from "react";
import type { MouseEvent, ReactNode } from "react";
import { useFloatingAnimation } from "./useFloatingAnimation";

/**
 * Renders an arrow SVG icon.
 * @param {object} props - Component props.
 * @param {string} [props.className] - Optional CSS class name.
 * @returns {JSX.Element} The arrow SVG.
 */
function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 8.5H14M14 8.5L6.77778 1M14 8.5L6.77778 16"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

type SubLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "default" | "site";
  isMobile: boolean;
  isActive?: boolean;
  onClick?: (e: MouseEvent) => void;
};

/**
 * Renders a single link item for the submenu.
 * @param {SubLinkProps} props - Props for the SubLinkItem.
 * @returns {JSX.Element} A submenu link component.
 */
function SubLinkItem({
  href,
  children,
  variant = "default",
  isMobile,
  isActive = false,
  onClick,
}: SubLinkProps) {
  const isLarge = variant === "site";
  const baseClasses =
    "flex w-full items-center transition-all duration-300 ease-out";

  const sizeClasses = isMobile
    ? isLarge
      ? "text-submenu-site leading-leading-submenu-site"
      : "text-lg leading-leading-submenu-mobile"
    : isLarge
    ? "text-submenu-site leading-leading-submenu-site"
    : "text-submenu-desktop leading-leading-submenu-desktop";

  const arrowClasses = isMobile
    ? isActive
      ? "w-4 opacity-100 mr-2.5"
      : "w-0 opacity-0 mr-0"
    : "w-0 opacity-0 tablet:group-hover:w-4 tablet:group-hover:opacity-100 tablet:group-hover:mr-2.5";

  const buttonClasses = isMobile
    ? isActive
      ? "opacity-60"
      : "opacity-0"
    : "opacity-0 tablet:group-hover:opacity-60";

  return (
    <a
      href={href}
      onClick={onClick}
      className={`${baseClasses} ${sizeClasses} ${!isMobile ? "group" : ""}`}
    >
      <ArrowIcon
        className={`shrink-0 transition-all duration-300 ${arrowClasses}`}
      />
      <span className="grow">{children}</span>
      {variant === "site" && (
        <span
          className={`shrink-0 text-right font-inter text-nav font-bold uppercase leading-leading-nav tracking-1 transition-opacity duration-300 ${buttonClasses}`}
        >
          Перейти на сайт
        </span>
      )}
    </a>
  );
}

type MenuProps = {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
};

/**
 * Renders the main fullscreen navigation menu.
 * @param {MenuProps} props - Props for the Menu component.
 * @returns {JSX.Element} The fullscreen menu.
 */
export function Menu({ isMenuOpen, onToggleMenu }: MenuProps) {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);

  /**
   * Tracks viewport width to apply mobile-specific logic.
   */
  const [isMobile, setIsMobile] = useState(false);

  /**
   * Effect to detect mobile viewport on mount and resize.
   */
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  /**
   * Effect to lock body scroll when menu is open and reset states.
   */
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      // Reset states on open
      setIsServicesOpen(false);
      setActiveLink(null);
    } else {
      document.body.style.overflow = "unset";
    }
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

    const blueDesktopRef = useRef<HTMLDivElement>(null);
  const purpleDesktopRef = useRef<HTMLDivElement>(null);
  const blueMobileRef = useRef<HTMLDivElement>(null);
  const purpleMobileRef = useRef<HTMLDivElement>(null);

  useFloatingAnimation({
    ref: blueDesktopRef,
    seedX: 10,
    seedY: 20,
    amplitude: 160,
    isEnabled: !isMobile && isMenuOpen,
  });

  useFloatingAnimation({
    ref: purpleDesktopRef,
    seedX: 30,
    seedY: 40,
    amplitude: 120,
    isEnabled: !isMobile && isMenuOpen,
  });

  useFloatingAnimation({
    ref: blueMobileRef,
    seedX: 50,
    seedY: 60,
    amplitude: 140,
    isEnabled: isMobile && isMenuOpen,
  });

  useFloatingAnimation({
    ref: purpleMobileRef,
    seedX: 70,
    seedY: 80,
    amplitude: 100,
    isEnabled: isMobile && isMenuOpen,
  });

  /**
   * Handles clicks on mobile submenu links.
   * Prevents default navigation for non-site links and toggles active state.
   * @param {MouseEvent} e - The mouse event.
   * @param {string} title - The title of the clicked link.
   */
  const handleSublinkClick = (e: MouseEvent, title: string) => {
    e.stopPropagation();

    const target = e.currentTarget as HTMLAnchorElement;
    const isSiteLink =
      target.textContent?.includes("Дата-центр") ||
      target.textContent?.includes("Реклама в центре");

    if (!isSiteLink) {
      e.preventDefault();
    }

    setActiveLink((prev) => (prev === title ? null : title));
  };

  /**
   * Data definition for the submenu links.
   */
  const subLinks: { title: string; variant?: "site" }[] = [
    { title: "Аренда павильонов и студий" },
    { title: "Аренда светового оборудования" },
    { title: "Декорации и сценография" },
    { title: "Монтаж видео и звука" },
    { title: "Выдача программ" },
    { title: "Дата-центр", variant: "site" },
    { title: "Реклама в центре", variant: "site" },
  ];

  return (
    <div
      id="fullscreen-menu"
      aria-hidden={!isMenuOpen}
      onClick={onToggleMenu}
      className={`
        fixed inset-0 z-50 w-full
        bg-background text-white 
        transition-opacity duration-300 ease-in-out
        ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        overflow-y-visible
      `}
    >
      {/* Background Blurs */}
      <div className="fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="hidden tablet:block">
          <div ref={blueDesktopRef} className="absolute w-blur-lg h-blur-md top-blur-desktop-top left-blur-desktop-left rounded-full bg-blur-blue blur-menu"></div>
          <div ref={purpleDesktopRef} className="absolute w-blur-md h-blur-sm top-blur-desktop-top-alt left-blur-desktop-left-alt rounded-full bg-blur-purple blur-menu"/>
        </div>
        <div className="block tablet:hidden">
          <div ref={blueMobileRef} className="absolute w-blur-lg h-blur-md top-blur-mobile-top left-blur-mobile-left rounded-full bg-blur-blue blur-menu"/>
          <div ref={purpleMobileRef} className="absolute w-blur-md h-blur-sm top-blur-mobile-top-alt left-blur-mobile-left-alt rounded-full bg-blur-purple blur-menu"/>
        </div>
      </div>

      {/* Main Content Container */}
      <div
        className="relative z-10 flex min-h-dvh w-full flex-col justify-start"
        onClick={!isMobile ? (e) => e.stopPropagation() : undefined}
      >
        {/* --- Top Section --- */}
        <div className="relative w-full grow flex flex-col">
          {/* --- Close Button Block --- */}
          <div className="relative w-full max-w-desktop mx-auto">
            <button
              type="button"
              aria-label="Закрыть меню"
              onClick={(e) => {
                e.stopPropagation();
                onToggleMenu();
              }}
              className="
                flex absolute top-menu-close-top-mobile tablet:top-menu-close-top right-menu-close-right-mobile tablet:right-menu-close-right z-20
                h-menu-close-mobile tablet:h-menu-close w-menu-close-mobile tablet:w-menu-close cursor-pointer 
                items-center justify-center 
                group
              "
            >
              <svg
                width="28.5"
                height="28.5"
                viewBox="0 0 32 32"
                fill="none"
                className={`
                    font-roboto text-5xl font-thin transition-all duration-300
                    ${isMenuOpen ? 'rotate-90 text-white' : 'rotate-0 text-white/80'} 
                    group-hover:rotate-90 group-hover:text-white 
                    group-active:rotate-90 group-active:text-white
                `}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.15002 1.15L15.525 15.525M29.9 29.9L15.525 15.525M15.525 15.525L29.9 1.15L1.15002 29.9"
                  stroke="white"
                  strokeWidth="2.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* --- Desktop Navigation --- */}
          <div className="hidden h-full grow tablet:grid grid-cols-[auto_1fr] desktop:grid-cols-[637px_1fr] max-w-desktop mx-auto w-full pl-16 pr-menu-right">
            <nav className="pr-menu-nav-right pt-menu-nav-top pb-10">
              <ul className="flex flex-col gap-menu-items font-inter text-menu-main font-medium leading-leading-menu-main tracking-menu-main">
                <li className="group flex items-center justify-between gap-menu-arrow">
                  <a
                    href="#"
                    className="transition-colors tablet:group-hover:text-white/60"
                  >
                    Услуги
                  </a>
                  <ArrowIcon className="shrink-0" />
                </li>
                <li>
                  <a
                    href="#"
                    className="transition-colors tablet:hover:text-white/70"
                  >
                    Экскурсии
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="transition-colors tablet:hover:text-white/70"
                  >
                    О центре
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="transition-colors tablet:hover:text-white/70"
                  >
                    Новости
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="transition-colors tablet:hover:text-white/70"
                  >
                    Контакты
                  </a>
                </li>
              </ul>
            </nav>

            {/* --- Desktop Submenu (Right Column) --- */}
            <div className="flex h-full w-full shrink-0 flex-col gap-submenu-gap border-l border-divider pl-submenu-left pt-submenu-top pb-10 desktop:gap-submenu-gap-desktop desktop:pl-submenu-left-desktop">
              <div className="flex w-full flex-col gap-submenu-items font-inter">
                {subLinks.map((link) => (
                  <SubLinkItem
                    key={link.title}
                    href="#"
                    variant={link.variant}
                    isMobile={false}
                  >
                    {link.title}
                  </SubLinkItem>
                ))}
              </div>
            </div>
          </div>

          {/* --- Mobile Navigation --- */}
          <div
            className="block grow px-mobile-padding pt-menu-nav-top-mobile tablet:hidden w-full max-w-desktop mx-auto"
            onClick={isMobile ? (e) => e.stopPropagation() : undefined}
          >
            <nav>
              <ul className="flex flex-col font-inter text-menu-mobile font-medium leading-leading-menu-mobile">
                <li className="flex flex-col pb-5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsServicesOpen(!isServicesOpen);
                    }}
                    aria-expanded={isServicesOpen}
                    className="flex w-full items-center justify-between gap-menu-arrow"
                  >
                    <span>Услуги</span>
                    <ArrowIcon
                      className={`shrink-0 transition-transform ${
                        isServicesOpen ? "rotate-90" : ""
                      }`}
                    />
                  </button>
                  {isServicesOpen && (
                    <>
                      <div className="flex flex-col gap-4 py-5">
                        {subLinks.map((link) => (
                          <SubLinkItem
                            key={link.title}
                            href="#"
                            variant={link.variant}
                            isActive={activeLink === link.title}
                            onClick={(e) => handleSublinkClick(e, link.title)}
                            isMobile={true}
                          >
                            {link.title}
                          </SubLinkItem>
                        ))}
                      </div>
                      <div className="h-px w-full bg-divider mt-5" />
                    </>
                  )}
                </li>
                <li>
                  <a href="#" className="block pb-5">
                    Экскурсии
                  </a>
                </li>
                <li>
                  <a href="#" className="block pb-5">
                    О центре
                  </a>
                </li>
                <li>
                  <a href="#" className="block pb-5">
                    Новости
                  </a>
                </li>
                <li>
                  <a href="#" className="block pb-5">
                    Контакты
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        {/* --- End Top Section --- */}

        {/* --- Bottom Section (Footer) --- */}
        <footer
          className="mt-auto w-full pb-footer-bottom-mobile tablet:pb-footer-bottom"
          onClick={isMobile ? (e) => e.stopPropagation() : undefined}
        >
          <div className="mb-footer-top-mobile tablet:mb-10 h-px w-full bg-divider" />

          {/* --- Footer Content --- */}
          <div className="flex flex-col gap-8 text-footer-mobile leading-leading-footer-mobile opacity-100 max-w-desktop mx-auto px-mobile-padding tablet:px-16 tablet:flex-row tablet:items-center tablet:gap-footer-gap tablet:text-footer-desktop tablet:leading-leading-footer-desktop">
            <a href="yandexmaps" className="transition-all text-footer opacity-60 hover:opacity-100 active:opacity-100">Москва, ул. Ленина, 12</a>
            <div className="flex flex-col gap-2.5 tablet:flex-row tablet:gap-footer-contacts">
              <a href="tel:89998888888" className="flex items-center gap-2.5 transition-all text-subaccient opacity-60 hover:opacity-100 active:opacity-100">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.3972 11.4888L11.0505 8.44588C10.8924 8.3019 10.6845 8.22509 10.4708 8.2317C10.257 8.2383 10.0542 8.32781 9.90532 8.48129L7.93517 10.5074C7.46095 10.4168 6.50757 10.1196 5.5262 9.14074C4.54483 8.15856 4.24762 7.20272 4.15953 6.73179L6.18402 4.76084C6.33749 4.61193 6.427 4.40914 6.43361 4.19541C6.44022 3.98167 6.3634 3.77374 6.21942 3.61564L3.17734 0.269786C3.03329 0.111184 2.8331 0.0149809 2.61927 0.00160689C2.40543 -0.0117671 2.19481 0.0587421 2.03213 0.19816L0.245575 1.7303C0.103236 1.87316 0.0182784 2.06328 0.00681852 2.26462C-0.00553094 2.47044 -0.240994 7.34597 3.53959 11.1282C6.83772 14.4254 10.969 14.6667 12.1068 14.6667C12.2731 14.6667 12.3752 14.6617 12.4024 14.6601C12.6035 14.6482 12.7934 14.563 12.9359 14.4205L14.4672 12.6331C14.6072 12.471 14.6782 12.2605 14.6651 12.0467C14.6521 11.8329 14.5559 11.6327 14.3972 11.4888Z"
                    fill="#F5F5F5"
                  />
                </svg>
                <span>8 (999) 888-88-88</span>
              </a>
              <a href="mailto:8888@center.ru" className="flex items-center gap-2.5 transition-all text-subaccient opacity-60 hover:opacity-100 active:opacity-100">
                <svg
                  width="16"
                  height="12"
                  viewBox="0 0 16 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 0H2C1.46974 0.000541441 0.961363 0.201851 0.586413 0.559758C0.211463 0.917665 0.000567223 1.40293 0 1.90909V10.0909C0.000567223 10.5971 0.211463 11.0823 0.586413 11.4402C0.961363 11.7981 1.46974 11.9995 2 12H14C14.5303 11.9995 15.0386 11.7981 15.4136 11.4402C15.7885 11.0823 15.9994 10.5971 16 10.0909V1.90909C15.9994 1.40293 15.7885 0.917665 15.4136 0.559758C15.0386 0.201851 14.5303 0.000541441 14 0ZM13.4936 3.15784L8.35071 6.97602C8.25043 7.05044 8.12703 7.09084 8 7.09084C7.87298 7.09084 7.74957 7.05044 7.64929 6.97602L2.50643 3.15784C2.446 3.11428 2.39525 3.0597 2.35712 2.99726C2.31899 2.93482 2.29424 2.86576 2.2843 2.79411C2.27437 2.72246 2.27946 2.64964 2.29926 2.57988C2.31907 2.51012 2.3532 2.44481 2.39968 2.38776C2.44615 2.3307 2.50405 2.28302 2.56999 2.24751C2.63594 2.21199 2.70862 2.18934 2.78382 2.18087C2.85901 2.17239 2.93522 2.17827 3.00802 2.19816C3.08081 2.21804 3.14874 2.25154 3.20786 2.2967L8 5.85443L12.7921 2.2967C12.912 2.21033 13.0626 2.17244 13.2115 2.19124C13.3603 2.21005 13.4955 2.28402 13.5876 2.39718C13.6798 2.51033 13.7216 2.65357 13.704 2.79592C13.6864 2.93826 13.6108 3.06828 13.4936 3.15784Z"
                    fill="#F5F5F5"
                  />
                </svg>
                <span>8888@center.ru</span>
              </a>
            </div>
          </div>
        </footer>
        {/* --- End Bottom Section --- */}
      </div>
    </div>
  );
}
