import { useState } from 'react';

function Storyblock({ buildTeleprompterContent, visible }) {
    const [hookBody, setHookBody] = useState('');
    const [introBody, setIntroBody] = useState('');
    const [askBody, setAskBody] = useState('');
    const [contentBody, setContentBody] = useState('');
    const [bonusBody, setBonusBody] = useState('');
    const [ctaBody, setCtaBody] = useState('');

    const handleSubmit = () => {
        let content =
            hookBody + introBody + askBody + contentBody + bonusBody + ctaBody;
    };

    const handleHookChange = (e) => {
        setHookBody(e.target.value);
    };
    const handleIntroChange = (e) => {
        setIntroBody(e.target.value);
    };
    const handleAskChange = (e) => {
        setAskBody(e.target.value);
    };
    const handleContentChange = (e) => {
        setContentBody(e.target.value);
    };
    const handleBonusChange = (e) => {
        setBonusBody(e.target.value);
    };
    const handleCtaChange = (e) => {
        setCtaBody(e.target.value);
    };

    if (!visible) return null;
    return (
        <>
            <section
                aria-labelledby='tool-title'
                className='tool-content-container script-container'
            >
                <h1 className='tool-heading' id='tool-title'>
                    Storyblock your video
                </h1>
                <form className='tool-form-container' onSubmit={handleSubmit()}>
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
                        <h2 id='content-label'>Content</h2>
                        <textarea
                            value={contentBody}
                            onChange={handleContentChange}
                            className='tool-form-input'
                        />
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
                    <input type='submit' value='Save' />
                </form>
            </section>
        </>
    );
}

export default Storyblock;
