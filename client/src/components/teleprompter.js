import { useEffect, useRef, useState } from 'react';

function Teleprompter({ content, visible }) {
    const [play, setPlay] = useState(false);
    const [scrollSpeed, setScrollSpeed] = useState(50);
    const [revisedContent, setRevisedContent] = useState();
    const teleSpeedRef = useRef();

    const scroller = useRef();
    const scrollerInterval = useRef();

    const handlePlay = () => {
        setPlay((current) => !current);
    };

    const autoscroll = async () => {
        const intv = () => {
            scroller.current.scrollTop += 1;
        };
        scrollerInterval.current = await setInterval(
            intv,
            1000 / teleSpeedRef.current.value
        );
        console.log(scrollerInterval.current);
    };

    useEffect(() => {
        if (!play) {
            console.log(scrollerInterval.current);
            clearInterval(scrollerInterval.current);
        } else {
            autoscroll();
        }

        return () => {
            clearInterval(scrollerInterval.current);
        };
    }, [play]);

    useEffect(() => {
        if (!visible) return;
        setRevisedContent(Object.values(content).flat());
    }, [visible]);

    if (!visible) {
        clearInterval(scrollerInterval.current);

        return null;
    }
    return (
        <>
            <section
                className='tool-content-container'
                aria-labelledby='tool-heading'
            >
                <h1 id='tool-heading'>Teleprompter</h1>
                <section
                    ref={scroller}
                    className={'teleprompter-content-container'}
                    aria-labelledby='teleprompter-body'
                >
                    <h2 className='hidden' id='teleprompter-body'>
                        Teleprompter
                    </h2>
                    {revisedContent &&
                        revisedContent.map((words, index) => {
                            return (
                                <div
                                    key={index}
                                    className='teleprompter-content'
                                >
                                    {words}
                                </div>
                            );
                        })}
                </section>
                <label for='speed' className='hidden'>
                    Teleprompter Speed
                </label>
                <input
                    ref={teleSpeedRef}
                    type='range'
                    id='speed'
                    name='speed'
                    min='1'
                    max='100'
                />
                <button
                    onClick={handlePlay}
                    className='teleprompter-play-button'
                >
                    Play
                </button>
            </section>
        </>
    );
}

export default Teleprompter;
