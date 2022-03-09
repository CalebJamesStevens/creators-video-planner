//import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

function Projects() {
    const fetchCurrentUser = () => {
        fetch('/api/users/current')
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            });
    };
    const testFetch = () => {
        const body = {
            email: 'test@test.com',
            password: 'test123',
        };
        fetch('/api/users/sign-in', {
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
            });
    };

    return (
        <main className='projects-page'>
            <h1 className='hidden'>Projects</h1>
            <section
                className='project-cards-container'
                aria-labelledby='projects-header-2'
            >
                <h2 className='project-header' id='projects-header-2'>
                    Projects
                </h2>

                <div onClick={testFetch} className='new-project-card'>
                    <FaPlus className='new-project-icon' />
                </div>
                <div onClick={fetchCurrentUser} className='new-project-card'>
                    <FaPlus className='new-project-icon' />
                </div>
            </section>
        </main>
    );
}

export default Projects;
