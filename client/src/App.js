import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Tool from './components/tool';
import Navbar from './components/navbar';
import Landing from './components/home/landing';
import Projects from './components/projects';
import SignIn from './components/users/sign-in';

function App() {
    return (
        <div className='App'>
            <Router>
                <Navbar />
                <Routes>
                    <Route path='/' element={<Landing />}></Route>
                    <Route path='/sign-in' element={<SignIn />}></Route>
                    <Route path='/tool' element={<Tool />}></Route>
                    <Route path='/projects' element={<Projects />}></Route>
                </Routes>
            </Router>
            <header className='header'></header>
        </div>
    );
}

export default App;
