import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Tool from './components/tool';
import Navbar from './components/navbar';
import Landing from './components/home/landing';
import Projects from './components/projects';
import SignIn from './components/users/sign-in';
import { useEffect, useState } from 'react';
import { UserContext } from './contexts/UserContext';
import NavbarSignedIn from './components/navbar-siged-in';

function App() {
    const [session, setSession] = useState({ state: 'loading' });
    const [user, setUser] = useState();

    const authenticateUser = () => {
        console.log('authenticating');
        console.log(session.state);
        fetch('/api/users/authenticate')
            .then((res) => res.json())
            .then((data) => {
                console.log('setting user');
                if (data.code === 101) {
                    setUser(data.user);
                    console.log(data);
                    return setSession({ state: 'signedIn' });
                }
                return setSession({ state: 'signedOut' });
            });
    };

    useEffect(() => {
        console.log(session.state);
        authenticateUser();
    }, []);

    if (!session.state) return;
    console.log(session.state);
    if (session.state === 'loading') {
        return (
            <div className='App'>
                <Router>
                    <UserContext.Provider
                        value={{ user, setUser, authenticateUser, setSession }}
                    >
                        <Navbar />
                        <Routes>
                            <Route path='/' element={<SignIn />}></Route>
                        </Routes>
                    </UserContext.Provider>
                </Router>
                <header className='header'></header>
            </div>
        );
    }

    if (session.state === 'signedOut') {
        return (
            <div className='App'>
                <Router>
                    <UserContext.Provider
                        value={{ user, setUser, authenticateUser, setSession }}
                    >
                        <Navbar />
                        <Routes>
                            <Route path='/' element={<SignIn />}></Route>
                            <Route path='/sign-in' element={<SignIn />}></Route>
                            <Route path='/tool' element={<SignIn />}></Route>
                            <Route
                                path='/projects'
                                element={<SignIn />}
                            ></Route>
                        </Routes>
                    </UserContext.Provider>
                </Router>
                <header className='header'></header>
            </div>
        );
    }

    return (
        <div className='App'>
            <Router>
                <UserContext.Provider
                    value={{ user, setUser, authenticateUser }}
                >
                    <NavbarSignedIn />
                    <Routes>
                        <Route path='/sign-in' element={<Landing />}></Route>
                        <Route
                            path='/tool/:projectID'
                            element={<Tool />}
                        ></Route>
                        <Route path='/' element={<Projects />}></Route>
                    </Routes>
                </UserContext.Provider>
            </Router>
            <header className='header'></header>
        </div>
    );
}

export default App;
