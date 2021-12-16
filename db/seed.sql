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
VALUES ("Mason", "Newell", null, 3),
("Ron", "Swanson", null, 2),
("Peter", "Griffin", null, 4),
("Dwight", "Shrute", null, 1);