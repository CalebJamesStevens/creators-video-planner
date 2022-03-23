import { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

function SignUp() {
    const navigate = useNavigate();
    const { user, authenticateUser, setSession } = useContext(UserContext);

    const emailInput = useRef();
    const passwordInput = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        const body = {
            email: emailInput.current.value,
            password: passwordInput.current.value,
        };
        fetch('/api/users/register', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.code === 101) {
                    setSession({ state: 'loading' });
                    authenticateUser();
                    navigate('/sign-in');
                }
            });
    };

    return (
        <>
            <main className='sing-in-page-container'>
                <h1 className='hidden'>Sign Up Page</h1>
                <form
                    onSubmit={(e) => handleSubmit(e)}
                    className='authentication-form'
                >
                    <label
                        className='form-input'
                        htmlFor='authentication-email-input'
                    >
                        Email:
                        <input
                            ref={emailInput}
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
                            ref={passwordInput}
                            id='authentication-password-input'
                            name='password'
                            type='password'
                        ></input>
                    </label>
                    <button className='authentication-submit' type='submit'>
                        Sign Up
                    </button>
                </form>
            </main>
        </>
    );
}

export default SignUp;
