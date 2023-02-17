DROP IF EXISTS TABLE users;

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    user_password TEXT
);
CREATE TABLE project_group_access(
    project_group_id SERIAL PRIMARY KEY,
    project_id INT REFERENCES projects(project_id),
    project_owner INT REFERENCES users(user_id),
    users_access INT[] REFERENCES users(user_id)
);
CREATE TABLE projects(
    project_id SERIAL PRIMARY KEY,
    project_group_id INT REFERENCES project_group_access(project_group_id),
    project_name VARCHAR(50),
    project_desc TEXT,
    
);
CREATE TABLE spells(
    spell_id SERIAL PRIMARY KEY
);
CREATE TABLE feats(
    feat_id SERIAL PRIMARY KEY
);