import express from 'express';
import pool from '../connect.js';
import { default as tx } from 'pg-tx';
import knex from '../knex.js';

const router = express.Router();

router.get('/user/all', async (req, res) => {
    const { user_id } = await req.user;
    const userProjects = await knex
        .from('projectsusers')
        .select('*')
        .where('user_id', '=', user_id);
    console.log(userProjects);
    const projectIDs = userProjects.map((data) => {
        return data.project_id;
    });
    const projects = await knex
        .from('projects')
        .select('*')
        .whereIn('project_id', projectIDs);
    console.log(projects);
    res.json({ projects });
});

router.get('/info/:projectID', async (req, res) => {
    const { projectID } = req.params;
    const projQuery = await pool.query(
        'SELECT * FROM projects WHERE project_id = $1',
        [projectID]
    );

    const chaptersQuery = await pool.query(
        'SELECT * FROM chapters WHERE project_id = $1',
        [projectID]
    );

    const project = projQuery.rows[0];
    const chapters = chaptersQuery.rows.map((obj) => {
        return obj.content;
    });
    if (project === undefined) {
        return res.json({ code: 104, message: "Project doesn't exist" });
    }

    return res.json({ code: 101, project: project, chapters: chapters });
});

router.post('/new', async (req, res) => {
    const { projectName, hook, chapters, intro, ask, bonus, callToAction } =
        req.body;
    const { user_id } = await req.user;

    try {
        const { projectID } = await knex.transaction(async (trx) => {
            const projectQuery = await trx('projects').insert(
                {
                    project_name: projectName,
                    hook: hook,
                    intro: intro,
                    ask: ask,
                    bonus: bonus,
                    call_to_action: callToAction,
                },
                ['project_id']
            );
            const projectID = projectQuery[0].project_id;

            await trx('projectsusers').insert({
                project_id: projectID,
                user_id: user_id,
            });

            const chaptersQueries = chapters.map((chapterContent, index) => {
                return {
                    project_id: projectID,
                    chapter_index: index,
                    content: chapterContent,
                };
            });
            await trx('chapters').insert(chaptersQueries);

            return { projectID };
        });

        console.log(projectID);

        return res.json({
            code: 101,
            projectID: projectID,
            message: 'Succesfully saved new project!',
        });
    } catch (error) {
        console.error(error);
        return res.json({
            code: 104,
            message: 'Failed to saved new project.',
        });
    }
});

router.put('/save', async (req, res) => {
    const { projectID, hook, chapters, intro, ask, bonus, callToAction } =
        req.body;
    const { user_id } = await req.user;
    console.log(projectID, hook, chapters, intro, ask, bonus, callToAction);
    try {
        await knex.transaction(async (trx) => {
            const chaptersQueries = chapters.map((chapterContent, index) => {
                return {
                    project_id: projectID,
                    chapter_index: index,
                    content: chapterContent,
                };
            });

            await trx('projects').where('project_id', '=', projectID).update({
                hook: hook,
                intro: intro,
                ask: ask,
                bonus: bonus,
                call_to_action: callToAction,
            });

            await trx('chapters').where('project_id', '=', projectID).del();
            await trx('chapters').insert(chaptersQueries);

            return res.json({
                code: 101,
                message: 'Succesfully saved new project!',
            });
        });
    } catch (error) {
        console.error(error);
        return res.json({
            code: 104,
            message: 'Failed to update project.',
        });
    }
});

export default router;
