/**
 * @file Main application component (App).
 * @author Danil Klimov
 * @version 1.0.2
 *
 * **MIT License**
 * **Copyright (c) 2025 Danil Klimov**
 *
 * Full text of the MIT License can be found in the LICENSE file in the root
 * directory of this source code.
 */

import { useState } from "react";
import { Header } from "./components/Header";
import { Menu } from "./components/Menu";
import "./index.css";

/**
 * The root component of the application.
 * Manages the global menu state and renders Header, Menu, and main content.
 * @returns {JSX.Element} The main App component.
 */
function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <Header isMenuOpen={isMenuOpen} onToggleMenu={toggleMenu} />
      <Menu isMenuOpen={isMenuOpen} onToggleMenu={toggleMenu} />
      <main className="pt-14 tablet:pt-17 desktop:pt-30">
        <div className="min-h-screen bg-white"></div>
      </main>
    </>
  );
}

export default App;
