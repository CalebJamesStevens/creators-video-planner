function Script() {
    const handleSubmit = () => {};

    return (
        <>
            <main className='script-container'>
                <h1>Create a script for your video</h1>
                <form onSubmit={handleSubmit()}>
                    <section aria-labledby='hook-label'>
                        <h2 id='hook-label'>Hook</h2>
                        <textarea />
                    </section>
                    <section aria-labledby='intro-label'>
                        <h2 id='intro-label'>Intro</h2>
                        <textarea />
                    </section>
                    <section aria-labledby='ask-label'>
                        <h2 id='ask-label'>Ask</h2>
                        <textarea />
                    </section>
                    <section aria-labledby='content-label'>
                        <h2 id='content-label'>Content</h2>
                        <textarea />
                    </section>
                    <section aria-labledby='bonus-label'>
                        <h2 id='bonus-label'>Bonus</h2>
                        <textarea />
                    </section>
                    <section aria-labledby='call-to-action-label'>
                        <h2 id='call-to-action-label'>Call To Action</h2>
                        <textarea />
                    </section>
                </form>
            </main>
        </>
    );
}

export default Script;
