const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getinward(param){
  let rows;
  if(param.fromdate && param.todate){
    rows = await db.query(
      `SELECT * FROM masters where date between '${helper.convertDate(param.fromdate)}' and '${helper.convertDate(param.todate)}' and type ='FORMER'`
    );
  } else {
    rows = await db.query(
      `SELECT * FROM masters`
    );
  }
  const data = helper.emptyOrRows(rows);
  

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
  } else if(param.fromdate && param.todate){
    rows = await db.query(
      `SELECT *, sum(amount) as totalamount FROM sales where date between '${helper.convertDate(param.fromdate)}' and '${helper.convertDate(param.todate)}' and billno = 0 group by businessmen`
    );
  } else if(param.businessname ){
    rows = await db.query(
      `SELECT sum(amount) as totalamount FROM sales where businessmen = '${param.businessname}' group by businessmen`
    );
    return rows;
  } else {

     rows = await db.query(
      `SELECT *, sum(amount) as totalamount FROM sales group by businessmen`
    );
  }
  const data = helper.emptyOrRows(rows);


  return data;
}

async function getTallyData(param){
  let puchaserows = '';
  let salesrows = '';
 
  if(param.date) {
    puchaserows = await db.query(
      `SELECT id, date, pname, sum(kgs) as kgs, sum(pack) as pack, sum(amount) as amount FROM purchase where date = '${helper.convertDate(param.date)}'  GROUP by pname `
    );
    salesrows = await db.query(
      `SELECT id, date, pname, sum(kgs) as kgs, sum(pack) as pack, sum(amount) as amount FROM sales where date = '${helper.convertDate(param.date)}' GROUP by pname`
    );
  } 
  const purchasedata = helper.emptyOrRows(puchaserows);
  const salesdata = helper.emptyOrRows(salesrows);


  return {
    purchase : purchasedata,
    sales : salesdata
  };
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
  getoutward,
  getTallyData
}