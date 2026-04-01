CREATE DATABASE IF NOT EXISTS campusDB;

USE campusDB;

CREATE TABLE IF NOT EXISTS timetable (
    id INT AUTO_INCREMENT PRIMARY KEY,
    time VARCHAR(20) NOT NULL,
    subject VARCHAR(100) NOT NULL,
    room VARCHAR(50) NOT NULL,
    students INT NOT NULL,
    status VARCHAR(50) NOT NULL,
    teacherID VARCHAR(100) NOT NULL
);

INSERT INTO timetable (time, subject, room, students, status, teacherID)
VALUES ('09:00 AM', 'Software Engineering', 'Room 402', 45, 'Completed', 'faculty1@campus.com');

CREATE DATABASE IF NOT EXISTS campusDB;

USE campusDB;

CREATE TABLE IF NOT EXISTS timetable (
    id INT AUTO_INCREMENT PRIMARY KEY,
    time VARCHAR(20) NOT NULL,
    subject VARCHAR(100) NOT NULL,
    room VARCHAR(50) NOT NULL,
    students INT NOT NULL,
    status VARCHAR(50) NOT NULL,
    teacherID VARCHAR(100) NOT NULL
);

INSERT INTO timetable (time, subject, room, students, status, teacherID)
VALUES ('09:00 AM', 'Software Engineering', 'Room 402', 45, 'Completed', 'faculty1@campus.com'),
('11:30 AM', 'Discrete Mathematics', 'Lab 12', 38, 'Ongoing', 'faculty1@campus.com'),
('02:00 PM', 'Research Seminar', 'Conference Hall B', 12, 'Upcoming', 'faculty1@campus.com'),
('04:30 PM', 'Faculty Meeting', 'Dean Office', 8, 'Upcoming', 'faculty1@campus.com'),

('09:00 AM', 'Database Systems', 'Room 305', 40, 'Completed', 'faculty2@campus.com'),
('11:30 AM', 'Operating Systems', 'Room 307', 35, 'Ongoing', 'faculty2@campus.com'),
('01:30 PM', 'Computer Networks', 'Lab 3', 30, 'Upcoming', 'faculty2@campus.com'),
('03:30 PM', 'Project Discussion', 'Conference Hall A', 10, 'Upcoming', 'faculty2@campus.com'),

('10:00 AM', 'Microprocessors', 'Room 201', 28, 'Completed', 'faculty3@campus.com'),
('12:00 PM', 'Embedded Systems', 'Lab 5', 25, 'Ongoing', 'faculty3@campus.com'),
('02:30 PM', 'Electronics Seminar', 'Room 202', 20, 'Upcoming', 'faculty3@campus.com');
SELECT * FROM timetable;

CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    department VARCHAR(100) NOT NULL,
    room VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    startTime TIME NOT NULL,
    endTime TIME NOT NULL,
    purpose VARCHAR(255) NOT NULL,
    requesterName VARCHAR(100) NOT NULL,
    requesterDept VARCHAR(100) NOT NULL
);
INSERT INTO bookings
(department, room, date, startTime, endTime, purpose, requesterName, requesterDept)
VALUES
('Computer Science', 'Room 101', '2026-04-01', '09:00:00', '10:00:00', 'Guest Lecture', 'Prof. Neenu', 'Computer Science');

SELECT * FROM bookings
WHERE room = 'Room 101' AND date = '2026-04-01';


CREATE TABLE IF NOT EXISTS merge_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    subject VARCHAR(100) NOT NULL,
    sectionA VARCHAR(50) NOT NULL,
    sectionB VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    room VARCHAR(50) NOT NULL,
    reason VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Pending',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

select * from merge_requests;
