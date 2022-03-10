import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { useWindowSize } from '../custom-hooks/useWindow';
import DesktopNavMenu from './desktop-nav-menu';
import MobileNavMenu from './mobile-nav-menu';

function NavbarSignedIn() {
    const [height, width] = useWindowSize();
    const { user, setUser } = useContext(UserContext);
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

export default NavbarSignedIn;
