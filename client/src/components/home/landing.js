function Landing() {
    const authenticateUser = () => {
        fetch('/api/tests')
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            });
    };

    return (
        <>
            <h1>Landing Page</h1>
            <button onClick={authenticateUser}>Click Me</button>
        </>
    );
}

export default Landing;
