const db = require('./db');
const helper = require('../helper');
const config = require('../config');


async function createsalesmaster(request){
  const result = await db.query(
    `INSERT INTO salesmaster 
     (billno, 
      date, 
      customerid, 
      comission, 
      rent, 
      credit,
      wages,
      toll,
      debit,
      refname,
      totalamount) 
    VALUES 
    ('${request.sales.billno}',
     '${request.sales.date}',
     '${request.sales.customerid}', 
     '${request.sales.comission}',
     '${request.sales.rent}', 
     '${request.sales.credit}',
     '${request.sales.wages}',
     '${request.sales.toll}', 
     '${request.sales.debit}',
     '${request.sales.refname}', 
     '${request.sales.totalamount}'
     )`
  );

  let message = "salesmaster error";

  if (result.affectedRows) {
    message = 'Salesmaster created successfully';
  }

  const salesid = result.insertId;

  for(var i=0;i<request.inwards.length;i++) {
  const result_inwords = await db.query(
    `INSERT INTO inwards 
     (salesid,
      productname, 
      kgs, 
      pack, 
      rate, 
      amount) 
    VALUES 
    ( '${salesid}',
      '${request.inwards[i].productname}',
      '${request.inwards[i].kgs}',
      '${request.inwards[i].pack}', 
      '${request.inwards[i].rate}',
      '${request.inwards[i].amount}')`
    );
  }


  for(var i=0;i<request.outwards.length;i++) {
    const result_outwards = await db.query(
      `INSERT INTO outwards 
       (salesid,
        customerid,
        productname, 
        kgs, 
        pack, 
        rate, 
        amount) 
      VALUES 
      ( '${salesid}',
        '${request.outwards[i].productname}',
        '${request.outwards[i].customerid}',
        '${request.outwards[i].kgs}',
        '${request.outwards[i].pack}', 
        '${request.outwards[i].rate}',
        '${request.outwards[i].amount}')`
      );
    }

  return {message};
}

async function getSalesId(id) {
  // let condition = '';
  // if(id==0){
  //   condition = 'ORDER BY ID DESC LIMIT 1';
  // } else {
  //   condition = 'where id='+id;
  // }
  const rows = await db.query(
    `SELECT billno, date, customerid, comission, rent, credit, wages, toll, debit, totalamount
    FROM salesmaster where id = '${id}'`
  );

   const data = helper.emptyOrRows(rows);
   return {
     data
   }
}



module.exports = {
  createsalesmaster,
  getSalesId
}