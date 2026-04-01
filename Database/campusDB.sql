CREATE DATABASE campus_resource_tracker;
USE campus_resource_tracker;
DROP TABLE IF EXISTS departments;
CREATE TABLE departments (
    department_id INT PRIMARY KEY AUTO_INCREMENT,
    department_name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
select*from departments;
INSERT INTO departments (department_id,department_name) VALUES
('Computer Science'),
('Mechanical Engineering'),
('Electrical Engineering'),
('Civil Engineering');

CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    department_id INT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'faculty', 'student') NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
        ON DELETE SET NULL
);


INSERT INTO users (name, email, password, role, department_id) VALUES
('Admin User', 'admin@gmail.com', '$2b$10$6xDwoqGbKod6WDAgS1o4FehFoN/NVSqvymzTIDiAWiAG8ylNcwITS', 'admin', 1),
('Faculty One', 'faculty1@gmail.com', '$2b$10$6xDwoqGbKod6WDAgS1o4FehFoN/NVSqvymzTIDiAWiAG8ylNcwITS', 'faculty', 1),
('Faculty Two', 'faculty2@gmail.com', '$2b$10$6xDwoqGbKod6WDAgS1o4FehFoN/NVSqvymzTIDiAWiAG8ylNcwITS', 'faculty', 2),
('Student One', 'student1@gmail.com', '$2b$10$6xDwoqGbKod6WDAgS1o4FehFoN/NVSqvymzTIDiAWiAG8ylNcwITS', 'student', 1);

SELECT user_id, name, email, role, department_id FROM users;

CREATE TABLE rooms (
    room_id INT PRIMARY KEY AUTO_INCREMENT,
    department_id INT NOT NULL,
    room_number VARCHAR(50) NOT NULL,
    capacity INT NOT NULL,
    room_type ENUM('classroom', 'lab') NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE (room_number, department_id),

    FOREIGN KEY (department_id)
        REFERENCES departments(department_id)
        ON DELETE CASCADE
);
ALTER TABLE rooms ADD current_occupancy INT DEFAULT 0;
delete from rooms where room_number='CS-101';
INSERT INTO rooms (room_number, capacity, department_id, room_type, current_occupancy)
VALUES (
  'CS-117',
  60,
  (SELECT department_id FROM departments WHERE department_name = 'Computer Science'),
  'classroom',
  '20'
),(
  'CS-118',
  60,
  (SELECT department_id FROM departments WHERE department_name = 'Computer Science'),
  'classroom',
  '40'
  
),
(
  'CS-119',
  40,
  (SELECT department_id FROM departments WHERE department_name = 'Computer Science'),
  'classroom',
  '30'
),
(
  'CS-120',
  40,
  (SELECT department_id FROM departments WHERE department_name = 'Computer Science'),
  'classroom',
  '30'
),
(
  'CS-168',
  60,
  (SELECT department_id FROM departments WHERE department_name = 'Computer Science'),
  'classroom',
  '40'
);
select * from rooms;

CREATE TABLE labs (
    lab_id INT PRIMARY KEY AUTO_INCREMENT,
    lab_name VARCHAR(100) NOT NULL,
    department_id INT NOT NULL,
    systems INT NOT NULL,
    software VARCHAR(100),
    current_occupancy INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (department_id)
        REFERENCES departments(department_id)
        ON DELETE CASCADE
);
select * from labs;
INSERT INTO labs (lab_name, department_id, systems, software, current_occupancy)
VALUES
('Lab 260',
 (SELECT department_id FROM departments WHERE department_name='Computer Science'),
 60, 'Java', 20),

('Lab 146',
 (SELECT department_id FROM departments WHERE department_name='Computer Science'),
 40, 'Python', 40),

('Lab 175',
 (SELECT department_id FROM departments WHERE department_name='Electrical Engineering'),
 35, 'MATLAB', 10),

('Lab 147',
 (SELECT department_id FROM departments WHERE department_name='Electrical Engineering'),
 50, 'Cisco', 25),

('Lab 148',
 (SELECT department_id FROM departments WHERE department_name='Computer Science'),
 70, 'C++', 30);
CREATE TABLE subjects (
    subject_id INT PRIMARY KEY AUTO_INCREMENT,
    department_id INT NOT NULL,
    subject_name VARCHAR(150) NOT NULL,
    
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
        ON DELETE CASCADE
);

INSERT INTO subjects (subject_id, subject_name) VALUES
(1, 'Advanced Software Engineering'),
(2, 'Discrete Mathematics'),
(3, 'Database Management Systems'),
(4, 'Operating Systems'),
(5, 'Research Seminar');

CREATE TABLE time_slots (
    slot_id INT PRIMARY KEY AUTO_INCREMENT,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    UNIQUE (start_time, end_time)
);
INSERT INTO time_slots (slot_id, start_time, end_time) VALUES
(1, '09:00:00', '10:00:00'),
(2, '10:00:00', '11:00:00'),
(3, '11:30:00', '12:30:00'),
(4, '02:00:00', '03:00:00'),
(5, '04:00:00', '05:00:00');

CREATE TA-- BLE timetable (
--     timetable_id INT PRIMARY KEY AUTO_INCREMENT,
--     faculty_id INT NOT NULL,
--     subject_id INT NOT NULL,
--     room_id INT NOT NULL,
--     slot_id INT NOT NULL,
--     day_of_week ENUM('Monday','Tuesday','Wednesday','Thursday','Friday') NOT NULL,
--     semester VARCHAR(20),
--     
--     FOREIGN KEY (faculty_id) REFERENCES users(user_id)
--         ON DELETE CASCADE,
--     FOREIGN KEY (subject_id) REFERENCES subjects(subject_id)
--         ON DELETE CASCADE,
--     FOREIGN KEY (room_id) REFERENCES rooms(room_id)
--         ON DELETE CASCADE,
--     FOREIGN KEY (slot_id) REFERENCES time_slots(slot_id)
--         ON DELETE CASCADE,
--     
--     UNIQUE (room_id, slot_id, day_of_week),
--     UNIQUE (faculty_id, slot_id, day_of_week)
-- );


-- CREATE TABLE booking_requests (
--     booking_id INT PRIMARY KEY AUTO_INCREMENT,
--     room_id INT NOT NULL,
--     requested_by INT NOT NULL,
--     slot_id INT NOT NULL,
--     booking_date DATE NOT NULL,
--     purpose TEXT NOT NULL,
--     status ENUM('pending','approved','rejected') DEFAULT 'pending',
--     reviewed_by INT NULL,
--     reviewed_at TIMESTAMP NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

--     FOREIGN KEY (room_id) REFERENCES rooms(room_id)
--         ON DELETE CASCADE,
--     FOREIGN KEY (requested_by) REFERENCES users(user_id)
--         ON DELETE CASCADE,
--     FOREIGN KEY (reviewed_by) REFERENCES users(user_id)
--         ON DELETE SET NULL
-- );


-- CREATE TABLE merge_requests (
--     merge_id INT PRIMARY KEY AUTO_INCREMENT,
--     requester_id INT NOT NULL,
--     target_faculty_id INT NOT NULL,
--     room_id INT NOT NULL,
--     slot_id INT NOT NULL,
--     merge_date DATE NOT NULL,
--     status ENUM('pending','approved','rejected') DEFAULT 'pending',
--     reviewed_by INT NULL,
--     reviewed_at TIMESTAMP NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

--     FOREIGN KEY (requester_id) REFERENCES users(user_id)
--         ON DELETE CASCADE,
--     FOREIGN KEY (target_faculty_id) REFERENCES users(user_id)
--         ON DELETE CASCADE,
--     FOREIGN KEY (room_id) REFERENCES rooms(room_id)
--         ON DELETE CASCADE,
--     FOREIGN KEY (slot_id) REFERENCES time_slots(slot_id)
--         ON DELETE CASCADE
-- );
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

DROP TABLE teachers;
CREATE TABLE teachers (
    teacher_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    subject VARCHAR(100) NOT NULL,
    department_id INT NOT NULL,
    assigned_room VARCHAR(50),
    status ENUM('Available', 'In Class', 'On Leave') DEFAULT 'Available',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (department_id)
        REFERENCES departments(department_id)
        ON DELETE CASCADE
);
INSERT INTO teachers (name, subject, department_id, assigned_room, status)
VALUES
('Prof. Neetika Gupta', 'Data Structures',
 (SELECT department_id FROM departments WHERE department_name='Computer Science'),
 'Room 101', 'Available'),

('Dr. Puneet Banga', 'Operating System',
 (SELECT department_id FROM departments WHERE department_name='Computer Science'),
 'Room 170', 'In Class'),

('Dr. Rajeev Gupta', 'DBMS',
 (SELECT department_id FROM departments WHERE department_name='Computer Science'),
 'Lab 3', 'Available'),

('Mr. Aashdeep Singh', 'Computer Networks',
 (SELECT department_id FROM departments WHERE department_name='Electrical Engineering'),
 'Room 201', 'On Leave'),

('Mr. Vishal Gupta', 'Mathematics',
 (SELECT department_id FROM departments WHERE department_name='Civil Engineering'),
 'Room 105', 'In Class'),

('Dr. Divya Aggarwal', 'Artificial Intelligence',
 (SELECT department_id FROM departments WHERE department_name='Computer Science'),
 'Lab 5', 'Available');
 select * from teachers;
SELECT * FROM users WHERE email = 'love@gmail.com';
SELECT * FROM departments;