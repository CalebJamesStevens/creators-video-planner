import { useState } from 'react';
import Script from './script';
import Storyblock from './storyblock';
import Teleprompter from './teleprompter';
import ToolNavigation from './Tools/tool-navigation';

function Tool() {
    const [currentTool, setCurrentTool] = useState('sb');
    const [tpContent, setTPContent] = useState({});

    const handleToolChange = (tool) => {
        setCurrentTool(tool);
    };

    const buildTeleprompterContent = (cont) => {
        setTPContent(cont);
    };
    return (
        <>
            <ToolNavigation handleChange={handleToolChange} />
            <main className='tool-container'>
                <Storyblock visible={currentTool === 'sb'} />
                <Script
                    buildTeleprompterContent={buildTeleprompterContent}
                    visible={currentTool === 'sc'}
                />
                <Teleprompter
                    content={tpContent}
                    visible={currentTool === 'tp'}
                />
            </main>
        </>
    );
}

export default Tool;
