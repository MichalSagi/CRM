const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://root:@localhost/cmd_db");
const dateFormat = require("dateformat");

router.get("/clients", async function(req, res) {
  const result = await sequelize.query(`
    SELECT clients.c_id, 
    clients.c_name AS client_name, 
    clients.email, 
    email_type.e_type, 
    countries.c_name AS country,
    owners.o_name ,
    clients.firstContact, 
    clients.sold 
    FROM clients LEFT Join countries On clients.country_id = countries.country_id
    LEFT JOIN owners ON clients.owner_id = owners.owner_id
    LEFT JOIN email_type ON clients.et_id = email_type.et_id`);
  res.send(result[0]);
});

router.get("/client/:id", async function(req, res) {
  const result = await sequelize.query(`SELECT * FROM clients WHERE c_id = ${req.params.id}`);
  res.send(result[0][0]);
});

router.get("/countries", async function(req, res) {
  const result = await sequelize.query("SELECT * FROM countries");
  res.send(result[0]);
});

router.get("/etypes", async function(req, res) {
  const result = await sequelize.query("SELECT * FROM email_type ORDER BY e_type");
  res.send(result[0]);
});

router.post("/country", async function(req, res) {
  const result = await sequelize.query(`INSERT INTO countries VALUES(null, '${req.body.country}')`);
  res.send(result[0].toString());
});

router.post("/client", async (req, res) => {
  const newData = new Date();
  const date = dateFormat(newData, "yyyy-mm-dd");
  const result = await sequelize.query(`
  INSERT INTO clients
  VALUES(null, '${req.body.c_name}', '${req.body.email}', '${date}', 0, 
  (SELECT owner_id FROM owners WHERE o_name = '${req.body.o_name}'), 
  (SELECT country_id FROM countries WHERE countries.c_name = '${req.body.country}'), null)`);
  res.send(result);
});

router.put("/client/:id", async (req, res) => {
  if (req.body.e_type !== "-") {
    ET_id = await sequelize.query(`SELECT et_id FROM email_type WHERE e_type ='${req.body.e_type}'`);
  } else {
    ET_id = null;
  }
  if (req.body.sold === '-') {
    req.body.sold = 0
  } else {
    req.body.sold = 1
  }
  const c_id = await sequelize.query(`SELECT country_id FROM countries WHERE c_name = '${req.body.country}'`);
  const o_id = await sequelize.query(`SELECT owner_id FROM owners WHERE o_name = '${req.body.o_name}'`);
  const result = await sequelize.query(`
  UPDATE clients 
  SET 
      c_name = '${req.body.c_name}',
      email = '${req.body.email}',
      sold = ${req.body.sold},
      owner_id = ${o_id[0][0].owner_id},
      et_id = ${null && ET_id[0][0].et_id},
      country_id = ${c_id[0][0].country_id}
  WHERE
     c_id = ${req.params.id};
  `);
  res.send(result[0]);
});

router.delete("/client/:id", (req, res) => {
  const result = sequelize.query(`DELETE FROM clients WHERE c_id = ${req.params.id}`);
  res.status(204).end();
});

router.get("/clients/email", async (req, res) => {
  const result = await sequelize.query(`
  SELECT COUNT(*), e_type 
  FROM clients, email_type 
  WHERE clients.et_id != 'null' 
  AND clients.et_id = email_type.et_id
  GROUP BY email_type.e_type DESC`);
  res.send(result[0]);
});

router.get("/clients/outstanding", async (req, res) => {
  const result = await sequelize.query(`SELECT c_name FROM clients WHERE sold = 1`);
  res.send(result[0]);
});

router.get("/countries/hotest", async (req, res) => {
  let result = await sequelize.query(`SELECT * FROM (
    SELECT COUNT(*) as NUM, countries.c_name 
    FROM countries, clients 
    WHERE clients.country_id = countries.country_id 
    AND clients.sold = 1 
    GROUP BY countries.c_name) AS hottest
    ORDER BY NUM DESC`);
  res.send(result[0]);
});

router.get("/owners/top", async (req, res) => {
  const result = await sequelize.query(`
    SELECT COUNT(*) AS Sales, owners.o_name 
    FROM owners, clients
    WHERE clients.owner_id = owners.owner_id
    AND clients.sold = 1
    GROUP BY owners.o_name
    ORDER BY Sales DESC 
    LIMIT 3`);
  res.send(result[0]);
});

router.get("/sales/countries", async (req, res) => {
  const result = await sequelize.query(`
  SELECT COUNT(*) as value, countries.c_name as name
  FROM countries, clients
  WHERE countries.country_id = clients.country_id
  AND clients.sold = 1
  GROUP BY countries.c_name`);
  res.send(result[0]);
});

router.get("/country", async (req, res) => {
  const result = await sequelize.query(`
  SELECT c_name FROM (
    SELECT COUNT(*) AS amount, countries.c_name 
    FROM countries, clients 
    WHERE countries.country_id = clients.country_id 
    AND clients.sold = 1 
    GROUP BY countries.c_name) as data1
    WHERE amount = (
    SELECT max(amount)
    FROM (
    SELECT COUNT(*) AS amount, countries.c_name 
    FROM countries, clients
    WHERE countries.country_id = clients.country_id
    AND clients.sold = 1
    GROUP BY countries.c_name
    ) as numMax )`);
  res.send(result[0]);
});

router.get("/sales/:startdate/:enddate", async (req, res) => {
  const startdate = req.params.startdate;
  const dateStart = dateFormat(startdate, "yyyy-mm-dd");
  const endDate = req.params.enddate;
  const dateEnd = dateFormat(endDate, "yyyy-mm-dd");
  const result = await sequelize.query(`
  SELECT clients.c_name, owners.o_name, countries.c_name as country, email_type.e_type 
  FROM clients, owners, countries, email_type
  WHERE clients.firstContact >= '${dateStart}'
  AND clients.firstContact <= '${dateEnd}'
  AND clients.sold = 1
  AND clients.owner_id = owners.owner_id
  AND clients.et_id = email_type.et_id
  AND clients.country_id = countries.country_id`);
  res.send(result);
});

router.get("/owners", async (req, res) => {
  const result = await sequelize.query("SELECT * FROM owners ORDER BY o_name");
  res.send(result[0]);
});

router.get("/firstcontact", async (req, res) => {
  const result = await sequelize.query(`
  select name ,count(*) as value
from(
SELECT result.* ,
case when sub>365 then '+12 months'
        when sub >0 and sub<=31 then 'last month'
            when sub >31 and sub<=186 then 'up to 6 months'
                when sub >210 and sub<=365 then "6-12 months"
                else 0 end as name
from(select DATE_FORMAT(CURDATE(), '01/%m/%Y') as today, 
    DATE_FORMAT(firstContact, '01/%m/%Y') as firstContact,
    DATEDIFF(DATE_FORMAT(CURDATE(), '%Y/%m/01'),(DATE_FORMAT(firstContact, '%Y/%m/01')))as sub
    from clients order by sub DESC) as result) as b
    GROUP by name`);
  res.send(result[0]);
});

router.get("/firstcontact/month", async (req, res) => {
  const result = await sequelize.query(`
  select COUNT(*) as value, CONCAT( MONTHNAME(firstContact) ,'-', year(firstContact)) as name, DATE(firstContact) as firstDate
  from clients
  GROUP BY name 
  order by year(firstContact), MONTH(firstContact)`);
  res.send(result[0]);
});

router.get("/etype/list", async (req, res) => {
  const result = await sequelize.query(`
  select email_type.e_type as name, count(*) as value 
  from clients , email_type
  where clients.et_id = email_type.et_id
  GROUP by email_type.e_type`);
  res.send(result[0]);
});

router.get("/owners/top/list", async (req, res) => {
  const result = await sequelize.query(`
    SELECT COUNT(*) AS value, owners.o_name as name
    FROM owners, clients
    WHERE clients.owner_id = owners.owner_id
    AND clients.sold = 1
    GROUP BY owners.o_name
    `);
  res.send(result[0]);
});

router.get("/firstcontact/month/list", async (req, res) => {
  const result = await sequelize.query(`
  SELECT COUNT(month(firstContact)) AS value, MONTHNAME(firstContact) as name 
  from clients
  GROUP by month(firstContact)`);
  res.send(result[0]);
});

router.get("/countries/group/list", async (req, res) => {
  const result = await sequelize.query(`
  select countries.c_name as name, count(*) as value from clients , countries
  where clients.country_id = countries.country_id 
  GROUP by countries.c_name`);
  res.send(result[0]);
});

module.exports = router;
