/**
 * @file Site header component.
 * @author Danil Klimov
 * @version 1.0.2
 *
 * **MIT License**
 * **Copyright (c) 2025 Danil Klimov**
 *
 * Full text of the MIT License can be found in the LICENSE file in the root
 * directory of this source code.
 */

/**
 * Renders the main site header.
 * Contains the logo, desktop navigation.
 * @returns {JSX.Element} The header component.
 */
export function Header() {
  return (
    <header className="fixed top-0 left-0 z-40 w-full bg-white">
      <div className="w-full max-w-desktop px-5 py-2.5 desktop:px-15 desktop:py-7.5 mx-auto">
        <div className="flex items-center justify-between">
          <a
            href="/"
            aria-label="На главную"
            className="font-roboto text-2xl uppercase leading-9 -tracking-2 tablet:text-3xl tablet:leading-11.25 desktop:text-4xl desktop:leading-13.5"
          >
            Логотип
          </a>
          <div className="flex w-fit items-center justify-between gap-x-5 desktop:gap-x-[3.9rem]">
            <nav
              aria-label="Основная навигация"
              className="hidden tablet:flex mt-0.5"
            >
              <ul className="flex gap-x-5 font-inter text-xs font-bold uppercase tracking-1 text-link-inactive desktop:gap-x-[3.9rem] desktop:text-nav desktop:leading-nav">
                <li className="flex flex-row items-center gap-1.5 border-b-2 border-white transition-colors hover:border-black hover:text-black">
                  <div className="grid grid-cols-2 grid-rows-2 gap-px">
                    <span className="block size-1 rounded-[1px] bg-accient"></span>
                    <span className="block size-1 rounded-[1px] bg-accient"></span>
                    <span className="row-start-2 block size-1 rounded-[1px] bg-accient"></span>
                    <span className="row-start-2 block size-1 rounded-[1px] bg-accient"></span>
                  </div>
                  <a href="#">Услуги</a>
                </li>
                <li className="mr-0.75 border-b-2 border-white transition-colors hover:border-black hover:text-black">
                  <a href="#">Экскурсии</a>
                </li>
                <li className="border-b-2 border-white transition-colors hover:border-black hover:text-black">
                  <a href="#">Новости</a>
                </li>
                <li className="border-b-2 border-white transition-colors hover:border-black hover:text-black">
                  <a href="#">О центре</a>
                </li>
                <li className="border-b-2 border-white transition-colors hover:border-black hover:text-black">
                  <a href="#">Контакты</a>
                </li>
              </ul>
            </nav>
            <div id="button-wrapper" className="size-9 tablet:size-12 desktop:size-15"></div>
          </div>
        </div>
      </div>
    </header>
  );
}
