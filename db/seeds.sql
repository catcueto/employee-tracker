-- Not adding id value because I set it to auto increment on schema.sql
INSERT INTO department (names)
VALUES ('Sales'),
       ('Engineering'),
       ('Finance'),
       ('Legal');
       
INSERT INTO roles (department_id, title, salary)
VALUES  (1,'Sales Lead', 110000),
        (1,'Salesperson', 80000),
        (2,'Lead Engineer', 160000),
        (2,'Software Engineer', 130000),
        (3,'Account Manager', 170000),
        (3,'Accountant', 125000),
        (4,'Legal Team Lead', 260000),
        (4, 'Lawyer', 200000);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Catalina', 'Cueto', 3, null),
-- Setting manager_id to null because employee has no manager
        ('Nashbi', 'Grand-Jean', 1, 2),
        ('Michael', 'Gonzalez', 1, 1),
        ('Teagrin', 'Forde', 1, 1),
        ('Paulo', 'Pinedo', 4, 3),
        ('Willy', 'Summerlin', 1, null );