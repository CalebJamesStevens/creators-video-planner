import { FaCube } from 'react-icons/fa';
import { CgTranscript } from 'react-icons/cg';
import { MdEditNote } from 'react-icons/md';
import { IconContext } from 'react-icons/lib';

function ToolNavigation({ handleChange }) {
    return (
        <>
            <nav className='tool-navigator-container'>
                <IconContext.Provider value={{ color: 'white' }}>
                    {/* <div
                        onClick={() => handleChange('sb')}
                        className='clickable-1 tool-nav-item'
                    >
                        <FaCube className='icon' />
                    </div> */}

                    <div
                        onClick={() => handleChange('sc')}
                        className='clickable-1 tool-nav-item'
                    >
                        <MdEditNote className='icon' />
                    </div>
                    <div
                        onClick={() => handleChange('tp')}
                        className='clickable-1 tool-nav-item'
                    >
                        <CgTranscript className='icon' />
                    </div>
                </IconContext.Provider>
            </nav>
        </>
    );
}

export default ToolNavigation;
