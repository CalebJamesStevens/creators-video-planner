import express from 'express';
import bcrypt from 'bcrypt';
import pool from '../connect.js';
import passport from 'passport';
import initialize from '../config/passport.js';

const router = express.Router();

initialize(
    passport,
    async (email) => {
        let q = await pool.query('SELECT * FROM Users WHERE email = $1', [
            email,
        ]);
        return q.rows[0];
    },
    async (id) => {
        let q = await pool.query('SELECT * FROM Users WHERE user_id = $1', [
            id,
        ]);
        return q.rows[0];
    }
);

router.get('/', (req, res) => {
    res.send('users');
});

router.post('/register', async (req, res) => {
    console.log(req.body);

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await pool.query('INSERT INTO Users(email, password) VALUES($1, $2)', [
            req.body.email,
            hashedPassword,
        ]);
        res.json({ password: hashedPassword });
    } catch (error) {
        res.json({ error: error });
    }
});

router.post(
    '/sign-in',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/',
    })
);

router.get('/current', async (req, res) => {
    console.log(await req.user);
    res.json({ msg: 'yoyoma' });
});

export default router;
