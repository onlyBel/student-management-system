DROP TABLE IF EXISTS scores CASCADE;
DROP TABLE IF EXISTS students CASCADE;
DROP TABLE IF EXISTS stream_subjects CASCADE;
DROP TABLE IF EXISTS subjects CASCADE;
DROP TABLE IF EXISTS streams CASCADE;

CREATE TABLE streams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE subjects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE stream_subjects (
    stream_id INT REFERENCES streams(id) ON DELETE CASCADE,
    subject_id INT REFERENCES subjects(id) ON DELETE CASCADE,
    PRIMARY KEY (stream_id, subject_id)
);

CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    admission_number VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    stream_id INT REFERENCES streams(id) ON DELETE SET NULL
);

CREATE TABLE scores (
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(id) ON DELETE CASCADE,
    subject_id INT REFERENCES subjects(id) ON DELETE CASCADE,
    ca_score NUMERIC(5,2) DEFAULT 0.00,
    exam_score NUMERIC(5,2) DEFAULT 0.00,
    total_score NUMERIC(5,2) GENERATED ALWAYS AS (ca_score + exam_score) STORED,
    CONSTRAINT unique_student_subject_score UNIQUE (student_id, subject_id)
);