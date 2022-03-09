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
--psql -U postgres

