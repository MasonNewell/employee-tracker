INSERT INTO department(name)
VALUES ("Human Resources"),
("Finance"),
("Engineering"),
("Sales");

INSERT INTO role (title, salary, department_id)
VALUES ("VP", 185000, 1),
("CPA", 68000, 2),
("Lead Engineer", 190000, 3),
("Closer", 99000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mason", "Newell", 3, 4),
("Ron", "Swanson", 4, 2),
("Peter", "Griffin", 2, 4),
("Dwight", "Shrute", 1, 1),
("Elon", "Musk", 3, null);