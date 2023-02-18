const db = require('./db');
const helper = require('../helper');
const config = require('../config');


async function getCustomer(id){
 
  const rows = await db.query(
    `SELECT id, customername, customertype, address, outletarea, phonenumber, tinnumber
    FROM customers where id = '${id}'`
  );
   const data = helper.emptyOrRows(rows);

   return {
     data
   }
}

async function updateCustomer(id, customer) {
  const result = await db.query(`update customers set customername='${customer.customername}', customertype='${customer.customertype}', address='${customer.address}', outletarea='${customer.outletarea}', phonenumber='${customer.phonenumber}', tinnumber='${customer.tinnumber}'  where id=${id}`);

  let message = "customer update error";

  if(result.affectedRows) {
    message = "customer updated successfully";
  }
}

module.exports = {
    getCustomer,
    updateCustomer
}