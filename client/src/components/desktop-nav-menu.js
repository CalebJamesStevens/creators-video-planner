import { useNavigate } from 'react-router-dom';

function DesktopNavMenu() {
    const navigate = useNavigate();

    return (
        <section
            className='desktop-nav-menu-container'
            aria-labelledby='nav-menu'
        >
            <h2 className='hidden' id='nav-menu'>
                Navigation Menu
            </h2>
            <div
                onClick={() => navigate('/tool')}
                className='clickable-1 desktop-nav-menu-item'
            >
                Tool
            </div>
            <div
                onClick={() => navigate('/projects')}
                className='clickable-1 desktop-nav-menu-item'
            >
                Projects
            </div>
            <div
                onClick={() => navigate('/sign-in')}
                className='clickable-1 desktop-nav-menu-item'
            >
                Sign In
            </div>
        </section>
    );
}

export default DesktopNavMenu;
