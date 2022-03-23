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

//Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        console.warn(path.resolve(__dirname, 'client', 'build', 'index.html'));
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(port, () => console.log(`Server started on port ${port}`));
