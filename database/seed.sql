TRUNCATE TABLE scores CASCADE;
TRUNCATE TABLE stream_subjects CASCADE;
TRUNCATE TABLE students CASCADE;
TRUNCATE TABLE subjects CASCADE;
TRUNCATE TABLE streams CASCADE;

INSERT INTO streams (name) VALUES ('Form 1A'), ('Form 1B'), ('Form 1C');

INSERT INTO subjects (name) VALUES ('Mathematics'), ('English Language'), ('Chemistry'), ('History');

INSERT INTO stream_subjects (stream_id, subject_id) VALUES
(1, 1), (1, 2), (1, 3), (1, 4),
(2, 1), (2, 2), (2, 3), (2, 4),
(3, 1), (3, 2), (3, 3), (3, 4);

INSERT INTO students (admission_number, name, stream_id) VALUES
('IKX-2026-001', 'Alex Kiprop', 1),
('IKX-2026-002', 'Grace Amina', 1),
('IKX-2026-003', 'Brian Otieno', 1),
('IKX-2026-004', 'Mary Wanjiku', 1),
('IKX-2026-005', 'Emmanuel Kipchirchir', 1),
('IKX-2026-006', 'Fatima Mohamed', 1),
('IKX-2026-007', 'Kevin Omondi', 1),
('IKX-2026-008', 'David Ndwiga', 2),
('IKX-2026-009', 'Frida Mwangi', 2),
('IKX-2026-010', 'Joseph Mutua', 2),
('IKX-2026-011', 'Asha Omar', 2),
('IKX-2026-012', 'Collins Cheruiyot', 2),
('IKX-2026-013', 'Mercy Chepngetich', 2),
('IKX-2026-014', 'Peter Kamau', 2),
('IKX-2026-015', 'Faith Kwamboka', 3),
('IKX-2026-016', 'Michael Okoth', 3),
('IKX-2026-017', 'Stacy Wairimu', 3),
('IKX-2026-018', 'Salim Juma', 3),
('IKX-2026-019', 'Joy Nafula', 3),
('IKX-2026-020', 'Daniel Mwenda', 3);

INSERT INTO scores (student_id, subject_id, ca_score, exam_score) VALUES
(1, 1, 22.00, 58.00), (1, 2, 20.00, 55.00), (1, 3, 18.00, 62.00), (1, 4, 25.00, 50.00),
(2, 1, 28.00, 65.00), (2, 2, 25.00, 68.00), (2, 3, 27.00, 64.00), (2, 4, 29.00, 61.00),
(3, 1, 15.00, 42.00), (3, 2, 19.00, 48.00), (3, 3, 14.00, 39.00), (3, 4, 16.00, 45.00),
(4, 1, 24.00, 60.00), (4, 2, 22.00, 57.00), (4, 3, 21.00, 59.00), (4, 4, 23.00, 55.00),
(5, 1, 18.00, 50.00), (5, 2, 20.00, 52.00), (5, 3, 19.00, 48.00), (5, 4, 17.00, 53.00);