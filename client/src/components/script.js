import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useInterval } from '../custom-hooks/useInterval.js';
import { useUnload } from '../custom-hooks/useUnload.js';

function Script({ buildTeleprompterContent, visible }) {
    const { projectID } = useParams();

    const [hookBody, setHookBody] = useState('');
    const [introBody, setIntroBody] = useState('');
    const [askBody, setAskBody] = useState('');
    const [contentBody, setContentBody] = useState(['']);
    const [bonusBody, setBonusBody] = useState('');
    const [ctaBody, setCtaBody] = useState('');

    const [loaded, setLoaded] = useState(false);

    const addChapter = () => {
        setContentBody((current) => [...current, '']);
    };

    const fetchProject = async () => {
        fetch(`/api/projects/info/${projectID}`)
            .then((res) => res.json())
            .then((data) => {
                setContentBody(data.chapters);
                setHookBody(data.project.hook);
                setIntroBody(data.project.intro);
                setAskBody(data.project.ask);
                setBonusBody(data.project.bonus);
                setCtaBody(data.project.call_to_action);
                setLoaded(true);
                console.log(data);
            });
    };

    const handleSaveProject = () => {
        const body = {
            projectID: projectID,
            hook: hookBody,
            intro: introBody,
            ask: askBody,
            chapters: contentBody,
            bonus: bonusBody,
            callToAction: ctaBody,
        };

        fetch('/api/projects/save', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.code === 101) {
                    console.log(data.message);
                } else {
                    console.error(data.message);
                }
            });
    };

    useInterval(() => {
        handleSaveProject();
    }, 15000);

    const handleSubmit = (e) => {
        let content = {
            hook: hookBody,
            intro: introBody,
            ask: askBody,
            content: contentBody,
            bonus: bonusBody,
            callToAction: ctaBody,
        };
        buildTeleprompterContent(content);
    };

    useEffect(() => {
        fetchProject();
    }, []);

    useEffect(() => {
        if (loaded) {
            handleSubmit();
        }
    }, [loaded]);

    const handleHookChange = (e) => {
        setHookBody(e.target.value);
        console.log(hookBody);
        handleSubmit();
    };
    const handleIntroChange = (e) => {
        handleSubmit();
        setIntroBody(e.target.value);
    };
    const handleAskChange = (e) => {
        handleSubmit();
        setAskBody(e.target.value);
    };
    const handleContentChange = (e, index) => {
        handleSubmit();
        let newArr = [...contentBody];
        newArr[index] = e.target.value;
        setContentBody(newArr);
    };
    const handleBonusChange = (e) => {
        handleSubmit();
        setBonusBody(e.target.value);
    };
    const handleCtaChange = (e) => {
        handleSubmit();
        setCtaBody(e.target.value);
    };

    if (!visible) return null;

    return (
        <>
            <section
                aria-labelledby='tool-title'
                className={`tool-content-container script-container`}
            >
                <h1 className='tool-heading' id='tool-title'>
                    Create a script for your video
                </h1>
                <section className='tool-form-container'>
                    <section
                        className='form-input-container'
                        aria-labelledby='hook-label'
                    >
                        <h2 id='hook-label'>Hook</h2>
                        <textarea
                            value={hookBody}
                            onChange={handleHookChange}
                            className='tool-form-input'
                        />
                    </section>
                    <section
                        className='form-input-container'
                        aria-labelledby='intro-label'
                    >
                        <h2 id='intro-label'>Intro</h2>
                        <textarea
                            value={introBody}
                            onChange={handleIntroChange}
                            className='tool-form-input'
                        />
                    </section>
                    <section
                        className='form-input-container'
                        aria-labelledby='ask-label'
                    >
                        <h2 id='ask-label'>Ask</h2>
                        <textarea
                            value={askBody}
                            onChange={handleAskChange}
                            className='tool-form-input'
                        />
                    </section>
                    <section
                        className='form-input-container'
                        aria-labelledby='content-label'
                    >
                        <h2 id='content-label'>Chapters</h2>
                        {contentBody?.map((chapterContent, index) => {
                            return (
                                <div key={index}>
                                    <h3>Chapter {index + 1}</h3>
                                    <textarea
                                        value={chapterContent}
                                        onChange={(e) => {
                                            handleContentChange(e, index);
                                        }}
                                        className='tool-form-input'
                                    />
                                </div>
                            );
                        })}
                        <button onClick={addChapter}>+</button>
                    </section>
                    <section
                        className='form-input-container'
                        aria-labelledby='bonus-label'
                    >
                        <h2 id='bonus-label'>Bonus</h2>
                        <textarea
                            value={bonusBody}
                            onChange={handleBonusChange}
                            className='tool-form-input'
                        />
                    </section>
                    <section
                        className='form-input-container'
                        aria-labelledby='call-to-action-label'
                    >
                        <h2 id='call-to-action-label'>Call To Action</h2>
                        <textarea
                            value={ctaBody}
                            onChange={handleCtaChange}
                            className='tool-form-input'
                        />
                    </section>
                </section>
            </section>
        </>
    );
}

export default Script;
