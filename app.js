import express from 'express';
import pool from './connect.js';
import knex from './knex.js';
import projects from './routes/projects.js';
import users from './routes/users.js';
import session from 'express-session';
import passport from 'passport';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

console.log(process.env.SESSION_SECRET);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/users', users);
app.use('/api/projects', projects);

app.listen(port, () => console.log(`Server started on port ${port}`));
