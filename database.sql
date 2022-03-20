CREATE DATABASE creatorsvideoplanner;

CREATE TABLE tests(
    test_id SERIAL PRIMARY KEY,
    username VARCHAR(30)

);



SELECT * FROM tests;

INSERT INTO tests (username) VALUES ('calebstevens');

CREATE TABLE Users(
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(60)
);

CREATE TABLE Projects(
    project_id SERIAL PRIMARY KEY,
    project_name VARCHAR(255),
    hook TEXT,
    intro TEXT,
    ask TEXT,
    bonus TEXT,
    call_to_action TEXT );

CREATE TABLE ProjectsUsers(
    project_id INTEGER,
    user_id INTEGER );

CREATE TABLE Chapters(
    chapter_id SERIAL PRIMARY KEY,
    project_id INTEGER,
    chapter_index INTEGER,
    content TEXT );

--psql -U postgres

