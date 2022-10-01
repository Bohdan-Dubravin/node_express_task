CREATE DATABASE notes;

\connect notes;

CREATE TABLE IF NOT EXISTS note (
    id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    created_at VARCHAR(30),
    content VARCHAR(200),
    dates VARCHAR(100),
    category VARCHAR(30),
    active BOOLEAN
);

INSERT INTO note (name, content, created_at, dates, category, active) VALUES ('Read new book', 'Read full book about self development','September 13, 2022', '02/02/2021', 'Task', TRUE);
INSERT INTO note (name, content, created_at, dates, category, active) VALUES ('Read new book', 'Read full book about self development','September 13, 2022', '02/02/2021', 'Idea', TRUE);