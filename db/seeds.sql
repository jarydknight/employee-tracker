INSERT INTO department (name)
VALUES
    ("Engineer"),
    ("Sales"),
    ("Legal"),
    ("Finance");

INSERT INTO role (title, salary, department_id)
VALUES
    ("Senior Engineer", 150000, 1),
    ("Junior Engineer", 100000, 1),
    ("Senior Sales Associate", 120000, 2),
    ("Junior Sales Associate", 80000, 2),
    ("Senior Legal Counsel", 150000, 3),
    ("Junior Legal Counsel", 120000, 3),
    ("Senior Finance Associate", 140000, 4),
    ("Junior Finance Associate", 110000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("Lewis", "Hamilton", 1, NULL),
    ("George", "Russell", 2, 1),
    ("Charles", "Leclerc", 3, NULL),
    ("Carlos", "Sainz", 4, 3),
    ("Lando", "Norris", 5, NULL),
    ("Daniel", "Ricciardo", 6, 5),
    ("Valtteri", "Bottas", 7, NULL),
    ("Guanyu", "Zhou", 8, 7);