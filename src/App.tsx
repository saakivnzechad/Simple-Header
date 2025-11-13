/**
 * @file Main application component (App).
 * @author Danil Klimov
 * @version 1.0.3
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
import { MenuToggle } from "./components/MenuToggle";
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
    <div className="scroll-smooth">
      <Header/>
      <Menu isMenuOpen={isMenuOpen} onToggleMenu={toggleMenu} />
      <MenuToggle isMenuOpen={isMenuOpen} onToggleMenu={toggleMenu} />
      <main className="pt-14 tablet:pt-17 desktop:pt-30">
        <div className="min-h-screen max-w-desktop mx-auto px-5 desktop:px-15 bg-white">
          <p className="text-justify w-full">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut sagittis nunc. Cras tellus felis, euismod ut faucibus at, condimentum id augue. In tincidunt orci sit amet mi tincidunt, a placerat arcu interdum. Nullam consectetur ligula a neque feugiat gravida. Sed varius eros purus, vitae condimentum felis sodales eu. Aliquam erat volutpat. Aenean eget tincidunt justo, a accumsan arcu. Quisque vitae tristique libero. Curabitur sagittis diam sit amet tortor maximus placerat. Ut est ante, malesuada ut vestibulum non, molestie id mauris. Proin ac ipsum dapibus, viverra purus non, pellentesque turpis. Maecenas eget neque pulvinar, viverra neque vitae, vehicula diam. Maecenas pulvinar ex non pellentesque vehicula. Proin arcu nibh, sodales vel hendrerit at, rhoncus et turpis. Vestibulum elementum, massa id congue feugiat, sapien ex faucibus neque, in ullamcorper eros purus a lorem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
            Aenean viverra velit sed pharetra convallis. Donec ac cursus nunc. Quisque maximus mi diam, ac tempus sapien ullamcorper id. Donec id justo in est lacinia sodales. Mauris iaculis ante urna, sed egestas dui dictum eget. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras bibendum, mauris eu volutpat viverra, elit ante malesuada enim, sed consectetur neque nulla vitae ante. Morbi ut odio at mi congue euismod. Ut metus nisi, ornare a convallis id, volutpat vel mi. Pellentesque dapibus, ligula nec fermentum eleifend, sapien neque dignissim ex, nec aliquam ipsum ligula condimentum est. Etiam convallis eleifend velit sed consectetur.
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis fringilla neque nec fringilla gravida. Nunc ut suscipit dolor. Curabitur iaculis varius lectus. Mauris feugiat ultrices euismod. Integer feugiat nibh a turpis posuere porttitor. Integer et volutpat urna. Duis dictum dui tempus risus hendrerit, non dictum urna pulvinar. Mauris consectetur interdum tortor in luctus. Maecenas egestas, eros sed volutpat semper, arcu nisi tincidunt massa, eget finibus libero dui vitae felis. Integer purus diam, vehicula in elementum vel, tristique condimentum quam. Etiam lobortis, nulla in dignissim vestibulum, nibh odio auctor lectus, quis aliquam tellus orci eget neque. In pellentesque laoreet massa, vitae venenatis nisi ullamcorper vel. Maecenas molestie posuere enim a tincidunt. In faucibus auctor nisl vel semper. Morbi a aliquet mi, at iaculis dui.
            Phasellus eget suscipit ante. Aliquam convallis dolor nec diam laoreet facilisis. Nam dapibus eros eu aliquam blandit. Aliquam laoreet risus non leo rhoncus vehicula. Proin aliquet sed massa sit amet imperdiet. Nunc feugiat, ante vel accumsan aliquet, mi mi commodo felis, ut rutrum augue tortor vel libero. Duis eu quam massa. Pellentesque semper aliquet tellus vitae rhoncus. Vestibulum non sodales leo. Nulla porttitor dolor tempus lorem tempor, quis eleifend dolor tincidunt. In convallis velit in lectus vestibulum elementum.
        </p>
        </div>
      </main>
    </div>
    </>
  );
}

export default App;
