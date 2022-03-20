//import { useState } from 'react';
import { useEffect, useReducer, useRef, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Navigate, useNavigate } from 'react-router-dom';

function Projects() {
    const naviagte = useNavigate();

    const [newProjectPopup, setNewProjectPopup] = useState(false);
    const newProjectName = useRef();
    const [projects, setProjects] = useState();

    const handleNewProject = (e) => {
        e.preventDefault();

        const body = {
            projectName: newProjectName.current.value,
            hook: '',
            intro: '',
            ask: '',
            chapters: [''],
            bonus: '',
            callToAction: '',
        };

        fetch('/api/projects/new', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.code === 101) {
                    naviagte(`/tool/${data.projectID}`);
                }
            });
    };

    useEffect(() => {
        fetch('/api/projects/user/all')
            .then((res) => res.json())
            .then((data) => {
                setProjects(data);
            });
    }, []);

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

                <div
                    onClick={() => setNewProjectPopup(true)}
                    className='new-project-card'
                >
                    <FaPlus className='new-project-icon' />
                </div>
                {projects?.projects?.map((project) => {
                    return (
                        <button
                            key={project.project_id}
                            onClick={() =>
                                naviagte(`/tool/${project.project_id}`)
                            }
                            className='new-project-card'
                        >
                            <h3>{project.project_name}</h3>
                        </button>
                    );
                })}
            </section>
            {newProjectPopup === true && (
                <div className='new-project-popup-container'>
                    <div className='new-project-popup'>
                        <form className='new-project-popup-form'>
                            <h3 className='new-project-popup-heading'>
                                Create New Project
                            </h3>
                            <label className='new-project-name-input-label'>
                                Project Name
                            </label>
                            <input
                                className='new-project-name-input'
                                ref={newProjectName}
                                type='text'
                            />
                            <div className='new-project-button-container'>
                                <button
                                    className='clickable-1 cancel-new-project-button'
                                    onClick={() => setNewProjectPopup(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={(e) => handleNewProject(e)}
                                    className='clickable-1 start-new-project-button'
                                >
                                    Start
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
}

export default Projects;
