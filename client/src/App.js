import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Tool from './components/tool';

function App() {
    return (
        <div className='App'>
            <Router>
                <Routes>
                    <Route path='/tool' element={<Tool />}></Route>
                </Routes>
            </Router>
            <header className='header'></header>
        </div>
    );
}

export default App;
