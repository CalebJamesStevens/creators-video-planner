import { useEffect, useRef, useState } from 'react';

function Teleprompter({ content, visible }) {
    const [play, setPlay] = useState(false);
    const [scrollSpeed, setScrollSpeed] = useState(50);

    const scroller = useRef();
    const scrollerInterval = useRef();

    const handlePlay = () => {
        setPlay((current) => !current);
    };

    const autoscroll = async () => {
        const intv = () => {
            scroller.current.scrollTop += 1;
        };
        scrollerInterval.current = await setInterval(intv, 1000 / scrollSpeed);
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
                    <h2 className='hidden' cid='teleprompter-body'>
                        Teleprompter
                    </h2>
                    {Object.keys(content).map((key, index) => {
                        return (
                            <div key={index} className='teleprompter-content'>
                                <h3 className='tp-block-heading'>{key}</h3>
                                {content[key]}
                            </div>
                        );
                    })}
                </section>
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
