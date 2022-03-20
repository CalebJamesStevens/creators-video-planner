import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

function DesktopNavMenu() {
    const navigate = useNavigate();
    const [validUser, setValidUser] = useState(false);

    useEffect(() => {
        fetch('/api/users/authenticate')
            .then((res) => res.json())
            .then((data) => {
                if (data.code === 101) {
                    setValidUser(true);
                }
            });
    }, []);

    return (
        <section
            className='desktop-nav-menu-container'
            aria-labelledby='nav-menu'
        >
            <h2 className='hidden' id='nav-menu'>
                Navigation Menu
            </h2>
            <div
                onClick={() => navigate('/')}
                className='clickable-1 desktop-nav-menu-item'
            >
                Projects
            </div>
            {!validUser && (
                <div
                    onClick={() => navigate('/sign-in')}
                    className='clickable-1 desktop-nav-menu-item'
                >
                    Sign In
                </div>
            )}
        </section>
    );
}

export default DesktopNavMenu;
