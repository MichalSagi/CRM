USE cmd_db;


-- SELECT c_name 
-- FROM (SELECT COUNT(*) AS amount, countries.c_name 
--   FROM countries, clients
--   WHERE countries.country_id = clients.country_id
--   AND clients.sold = 1
--   GROUP BY countries.c_name
--   ) as amount, num
--   AND amount = (select max(amount) as numMax From (SELECT COUNT(*) AS amount, countries.c_name 
--   FROM countries, clients
--   WHERE countries.country_id = clients.country_id
--   AND clients.sold = 1
--   GROUP BY countries.c_name) as numbers)

-- CREATE TABLE owners(
--     owner_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     o_name VARCHAR(30)
-- );

-- CREATE TABLE countries(
--     country_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     c_name VARCHAR(20)
-- );

-- CREATE TABLE email_type(
--     et_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     e_type VARCHAR(1)
-- );

-- CREATE TABLE clients(
--     c_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     c_name VARCHAR(30),
--     email VARCHAR(50),
--     firstContact DATE,
--     sold BOOLEAN,
--     owner_id INT,
--     country_id INT,
--     et_id INT,
--     FOREIGN KEY(owner_id) REFERENCES owners(owner_id),
--     FOREIGN KEY(country_id) REFERENCES countries(country_id),
--     FOREIGN KEY(et_id) REFERENCES email_type(et_id)
-- );

-- SELECT * FROM email_type;

-- DROP TABLE clients;
-- DROP TABLE email_type;
-- select * from owners
-- select * from countries;
-- SELECT clients.c_name, owners.o_name, countries.c_name as countries, email_type.e_type 
--   FROM clients, owners, countries, email_type
--   WHERE clients.firstContact >= '2018-04-05'E
--   AND clients.firstContact <= '2018-06-05'
--   AND clients.sold = 1
--   AND clients.owner_id = owners.owner_id
--   AND clients.et_id = email_type.et_id
-- --   AND clients.country_id = countries.country_id;
-- SELECT clients.c_id, clients.c_name AS client_name, clients.email, email_type.e_type, countries.c_name AS country, owners.owner_id,clients.firstContact, clients.sold 
-- FROM clients, countries, owners, email_type
-- WHERE clients.owner_id = owners.owner_id
-- AND clients.et_id = email_type.et_id
-- AND clients.country_id = countries.country_id

-- SELECT * FROM clients 
-- SELECT clients.c_id, 
--     clients.c_name AS client_name, 
--     clients.email, 
--     email_type.e_type, 
--     countries.c_name AS country,
--     owners.o_name ,
--     clients.firstContact, 
--     clients.sold 
--     FROM clients LEFT Join countries On clients.country_id = countries.country_id
--     LEFT JOIN owners ON clients.owner_id = owners.owner_id
--     LEFT JOIN email_type ON clients.et_id = email_type.et_id
   
-- UPDATE clients 
--   SET 
--       c_name = 'Zohar Rec',
--       email = 'zohar@33',

--       sold = 1,
--       et_id = null
--   WHERE
--      c_id = 766;

-- SELECT owner_id FROM owners WHERE o_name = 'Martin Massey'

-- select * FROM clients WHERE c_id =765

-- SELECT clients.c_id, 
--     clients.c_name AS client_name, 
--     clients.email, 
--     email_type.e_type 
--     FROM clients
--     left join email_type
--     on clients.et_id = email_type.et_id 

-- delete from clients where c_name = 'undefined'
-- SELECT c_name
-- FROM (
--     SELECT COUNT(*) AS amount, countries.c_name FROM countries, clients
--   WHERE countries.country_id = clients.country_id
--   AND clients.sold = 1
--   GROUP BY countries.c_name
--   ) as data1
--   WHERE amount = 
--   (SELECT max(amount)
-- FROM ( SELECT COUNT(*) AS amount, countries.c_name FROM countries, clients
--   WHERE countries.country_id = clients.country_id
--   AND clients.sold = 1
--   GROUP BY countries.c_name
--   ) as numMax )

-- select diff_from_first_contat,count(*) as num_in_period
-- from(
-- SELECT result.* ,
-- case when sub>365 then '+12 months'
--         when sub >0 and sub<=31 then 'last month'
--             when sub >31 and sub<=186 then 'up to 6 months'
--                 when sub >210 and sub<=365 then "6-12 months"
--                 else 0 end as diff_from_first_contat
-- from(select DATE_FORMAT(CURDATE(), '01/%m/%Y') as today, 
--     DATE_FORMAT(firstContact, '01/%m/%Y') as firstContact,
--     DATEDIFF(DATE_FORMAT(CURDATE(), '%Y/%m/01'),(DATE_FORMAT(firstContact, '%Y/%m/01')))as sub
--     from clients order by sub DESC) as result) as b
--     GROUP by diff_from_first_contat

-- select COUNT(*) as value, CONCAT( MONTHNAME(firstContact) ,'-', year(firstContact)) as name, DATE(firstContact) 
-- from clients
-- GROUP BY name 
-- order by year(firstContact), MONTH(firstContact)

-- select countries.c_name as name, count(*) as value from clients , countries
-- where clients.country_id = countries.country_id
-- GROUP by countries.c_name

-- SELECT COUNT(*) AS Sales, owners.o_name 
--     FROM owners, clients
--     WHERE clients.owner_id = owners.owner_id
--     AND clients.sold = 1
--     GROUP BY owners.o_name
--     ORDER BY Sales DESC 
--     LIMIT 3

-- SELECT COUNT(month(firstContact)) AS value , MONTHNAME(firstContact) as name 
-- from clients
-- GROUP by month(firstContact)



