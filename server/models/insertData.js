const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://root:@localhost/cmd_db");
const data = require("./data.json");
const dateFormat = require('dateformat')

const storCountries = async data => {
  const countriesData = await [...new Set(data.map(c => c.country))];
  countriesData.map(country => sequelize.query(`INSERT INTO countries VALUES(null, '${country}')`))
};

// storCountries(data).then(data1 => {
//     console.log(data1)
// })
const storEmailType = async data => {
    const emailTypeData = await [...new Set(data.map(e => e.emailType && e.emailType))];
    emailTypeData.filter(e => e != null).
    map(emType => sequelize.query(`INSERT INTO email_type VALUES(null, '${emType}')`))
  };
  // storEmailType(data).then(data1 => {
  //     console.log(data1)
  // })

  const storOwners = async data => {
    const ownersData = await [...new Set(data.map(e => e.owner))];
    ownersData.map(owner => sequelize.query(`INSERT INTO owners VALUES(null, '${owner}')`))
  };

//   storOwners(data).then(data1 => {
//       console.log(data1)
//   })
  
const storClients =  data => {
    const clientData = data.forEach(c => { 
      c.first = new Date(c.firstContact)
      first = dateFormat(c.first, "yyyy-mm-dd")
    sequelize.query(`INSERT INTO clients 
    VALUES(null,'${c.name}', '${c.email}', '${first}', ${c.sold},
     (SELECT owner_id FROM owners WHERE owners.o_name = '${c.owner}'), 
     (SELECT country_id FROM countries WHERE countries.c_name = '${c.country}'), 
     (SELECT et_id FROM email_type WHERE email_type.e_type = '${c.emailType}'))`)
    })
}

// storClients(data)
