DROP TABLE IF EXISTS feats;
DROP TABLE IF EXISTS spells;
DROP TABLE IF EXISTS projects_abilities;
DROP TABLE IF EXISTS project_feats;
DROP TABLE IF EXISTS project_subclasses;
DROP TABLE IF EXISTS project_classes;
DROP TABLE IF EXISTS project_spells;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS abilities;
DROP TABLE IF EXISTS subclass_abilities;
DROP TABLE IF EXISTS subclasses;
DROP TABLE IF EXISTS classes;
DROP TABLE IF EXISTS project_group_access;
DROP TABLE IF EXISTS users;

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    user_password TEXT
);
CREATE TABLE abilities(
    ability_id SERIAL PRIMARY KEY,
    ability_owner INT REFERENCES users(user_id),
    ability_level INT,
    ability_name VARCHAR(50),
    ability_subhead VARCHAR(100),
    ability_description TEXT
);
CREATE TABLE subclasses(
    subclass_id SERIAL PRIMARY KEY,
    subclass_owner INT REFERENCES users(user_id),
    subclass_class VARCHAR(50),
    subclass_name VARCHAR(50),
    subclass_desc TEXT
);
CREATE TABLE subclass_abilities(
    subclass_abilities_id SERIAL PRIMARY KEY,
    subclass_abilities_sub INT REFERENCES subclasses(subclass_id),
    subclass_abilities_abl INT REFERENCES abilities(ability_id)
);
CREATE TABLE classes(
    class_id SERIAL PRIMARY KEY,
    class_owner INT REFERENCES users(user_id),
    class_name VARCHAR(100),
    class_hd VARCHAR(4),
    class_armor VARCHAR(30)[],
    class_weap VARCHAR(30)[],
    class_tools VARCHAR(30)[],
    class_skills VARCHAR(30)[]
);
CREATE TABLE class_abilities(
    class_abilities_id SERIAL PRIMARY KEY,
    class_abilities_sub INT REFERENCES classes(class_id),
    class_abilities_abl INT REFERENCES abilities(ability_id)
);
CREATE TABLE feats(
    feat_id SERIAL PRIMARY KEY,
    feat_owner INT REFERENCES users(user_id),
    feat_title VARCHAR(100),
    feat_subhead VARCHAR(100),
    feat_desc TEXT
);
CREATE TABLE spells(
    spell_id SERIAL PRIMARY KEY,
    spell_owner INT REFERENCES users(user_id),
    spell_title VARCHAR(100),
    spell_subhead VARCHAR(100),
    spell_desc TEXT
);
CREATE TABLE projects(
    project_id SERIAL PRIMARY KEY,
    project_name VARCHAR(50),
    project_desc TEXT
);
CREATE TABLE project_group(
    project_group_id SERIAL PRIMARY KEY,
    project_id INT REFERENCES projects(project_id),
    project_owner INT REFERENCES users(user_id)
);
CREATE TABLE project_group_access(
    project_group_access_id SERIAL PRIMARY KEY,
    project_group_id INT REFERENCES project_group(project_id),
    project_group_access INT REFERENCES users(user_id)
);

CREATE TABLE project_classes(
    project_classes_id SERIAL PRIMARY KEY,
    project_id INT REFERENCES projects(project_id),
    project_class_id INT REFERENCES classes(class_id)
);
CREATE TABLE project_subclasses(
    project_subclasses_id SERIAL PRIMARY KEY,
    project_id INT REFERENCES projects(project_id),
    project_subclass_id INT REFERENCES subclasses(subclass_id)
);
CREATE TABLE project_spells(
    project_spells_id SERIAL PRIMARY KEY,
    project_id INT REFERENCES projects(project_id),
    project_spell_id INT REFERENCES spells(spell_id)
);
CREATE TABLE project_feats(
    project_feats_id SERIAL PRIMARY KEY,
    project_id INT REFERENCES projects(project_id),
    project_feat_id INT REFERENCES feats(feat_id)
);
CREATE TABLE project_abilities(
    project_abilities_id SERIAL PRIMARY KEY,
    project_id INT REFERENCES projects(project_id),
    project_ability_id INT REFERENCES abilities(ability_id)
);

