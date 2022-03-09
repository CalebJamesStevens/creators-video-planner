import { useWindowSize } from '../custom-hooks/useWindow';
import DesktopNavMenu from './desktop-nav-menu';
import MobileNavMenu from './mobile-nav-menu';

function Navbar() {
    const [height, width] = useWindowSize();
    return (
        <>
            <nav className='navbar'>
                <div>Logo</div>
                {width > 750 && <DesktopNavMenu />}
                {width <= 750 && <MobileNavMenu />}
            </nav>
        </>
    );
}

export default Navbar;
