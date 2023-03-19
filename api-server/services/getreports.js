const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getinward(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM masters`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data
  }
}

async function getoutward(param){
  let rows = '';
 
  if(param.bman) {
     rows = await db.query(
      `SELECT * FROM sales where businessmen = '${param.bman}'`
    );
  } else {
     rows = await db.query(
      `SELECT *, sum(amount) as totalamount FROM sales group by businessmen`
    );
  }
  const data = helper.emptyOrRows(rows);


  return data;
}

// async function getCustomer(id){
//   const rows = await db.query(
//     `SELECT id, customername, customertype, address 
//     FROM customers where id= id `
//   );
//    const data = helper.emptyOrRows(rows);
//    return {
//      data
//    }
// }


 

module.exports = {
  getinward,
  getoutward
}