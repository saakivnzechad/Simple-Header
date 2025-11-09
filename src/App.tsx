import { useState } from 'react';
import { Header } from './components/Header';
// import { Menu } from './components/Menu';
import './index.css'

function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    return (
        <>
            <Header isMenuOpen={isMenuOpen} onToggleMenu={toggleMenu} />
            {/* <Menu isMenuOpen={isMenuOpen} onToggleMenu={toggleMenu} /> */}
            <main className="pt-14 tablet:pt-17 desktop:pt-30">
                <div className="h-screen bg-white"></div>
            </main>
        </>
    );
}

export default App;