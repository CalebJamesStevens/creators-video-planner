import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Script from './script';
import Storyblock from './storyblock';
import Teleprompter from './teleprompter';
import ToolNavigation from './Tools/tool-navigation';

function Tool() {
    const { projectID } = useParams();
    const [currentTool, setCurrentTool] = useState('sc');
    const [scriptContent, setScriptContent] = useState({});
    const [tpContent, setTPContent] = useState({});

    const handleToolChange = (tool) => {
        setCurrentTool(tool);
    };

    const buildTeleprompterContent = (cont) => {
        console.log('building script');
        setTPContent(cont);
    };

    const fetchProject = () => {
        fetch(`/api/projects/info/${projectID}`)
            .then((res) => res.json())
            .then((data) => {
                setScriptContent({
                    project: data.project,
                    chapters: data.chapters,
                });
                console.log(data);
            });
    };

    useEffect(() => {}, []);

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
