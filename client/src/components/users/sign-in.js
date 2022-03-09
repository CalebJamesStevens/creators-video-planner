function SignIn() {
    const handleSubmit = (data) => {
        const body = new FormData(data);
        fetch('/api/users/sign-in', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    };

    return (
        <>
            <main className='sing-in-page-container'>
                <h1 className='hidden'>Sign In Page</h1>
                <form
                    action='/api/users/sign-in'
                    method='POST'
                    className='authentication-form'
                >
                    <label
                        className='form-input'
                        htmlFor='authentication-email-input'
                    >
                        Email:
                        <input
                            id='authentication-email-input'
                            name='email'
                            type='email'
                        ></input>
                    </label>
                    <label
                        className='form-input'
                        htmlFor='authentication-password-input'
                    >
                        Password:
                        <input
                            id='authentication-password-input'
                            name='password'
                            type='password'
                        ></input>
                    </label>
                    <button className='authentication-submit' type='submit'>
                        Sign In
                    </button>
                </form>
            </main>
        </>
    );
}

export default SignIn;
