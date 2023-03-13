const db = require('./db');
const helper = require('../helper');
const config = require('../config');


async function createsalesmaster(request){

  const result = await db.query(
    `INSERT INTO masters 
     (date, 
      name, 
      credit, 
      debit,
      reason, 
      billdate,
      billno,
      type,
      billbook,
      salesman,
      amount,
      commission,
      rent,
      cooly,
      sungam
      ) 
    VALUES 
    ('${request.sales.date}',
     '${request.sales.customerid}',
     '${request.sales.credit}', 
     '${request.sales.debit}', 
     'INWORD',
     '${request.sales.date}', 
     '${request.sales.billno}',
     'FORMER',
     'BILL BOOK', 
     'SALES MAN',
     '${request.sales.totalamount}', 
     '${request.sales.commission}',
    '${request.sales.rent}',
    '${request.sales.wages}',
    '${request.sales.toll}'
     )`
  );

  let message = "salesmaster error";

  if (result.affectedRows) {
    message = 'Salesmaster created successfully';
  }

  const salesid = result.insertId;
  const getrefno = await db.query(
    `SELECT refno from purchase ORDER BY refno DESC LIMIT 1`
  );
  
  //const refno = getrefno[0].refno+1;
  for(var i=0;i<request.inwards.length;i++) {
  const result_inwords = await db.query(
    `INSERT INTO purchase 
     (date,
      refno, 
      cname, 
      pname, 
      kgs, 
      pack,
      rate,
      amount,
      pcode,
      category,
      commission,
      rent,
      cooly,
      sungam,
      code) 
    VALUES 
    ( '${request.sales.date}',
      '${salesid}',
      '${request.sales.customerid}',
      '${request.inwards[i].product}', 
      '${request.inwards[i].kgs}',
      '${request.inwards[i].pack}',
      '${request.inwards[i].rate}',
      '${request.inwards[i].amount}',
      '${request.inwards[i].product}',
      'KGS',
      '${request.sales.commission}',
      '${request.sales.rent}',
      '${request.sales.wages}',
      '${request.sales.toll}',
      '1'
      )`
    );

    const purchaseid = result_inwords.insertId;
    for(var j=0;j<request.inwards[i].packValue.length;j++) {
      const result_pack = await db.query(
        `INSERT INTO packpurchase 
         (date,
          refno, 
          product, 
          qty,
          sno
         )
         VALUES 
         ( '${request.sales.date}',
           '${purchaseid}',
           '${request.inwards[i].product}',
           '${request.inwards[i].packValue[j].modalPack}',
           '${j+1}'
         )`
      ); 
             
    }

  }


  for(var i=0;i<request.outwards.length;i++) {
    const result_outwards = await db.query(
      `INSERT INTO sales 
       (date,
        refno,
        cname, 
        businessmen, 
        kgs, 
        pack, 
        rate,
        amount,
        pname,
        category,
        code
        ) 
      VALUES 
      ( '${request.sales.date}',
        '${salesid}',
        '${request.sales.customerid}',
        '${request.outwards[i].businessMan}',
        '${request.outwards[i].outKgs}',
        '${request.outwards[i].outPack}', 
        '${request.outwards[i].outRate}',
        '${request.outwards[i].outAmount}',
        '${request.outwards[i].outProduct}',
        'KGS',
        '1'
        )`
      );
    }

  return {message};
}

async function getSalesId(id) {
  let condition = '';
  let data = '';
  if(id==0){
    condition = 'ORDER BY billno DESC LIMIT 1';
    const rows = await db.query(
      `SELECT * FROM masters ${condition}`
    );
    data = helper.emptyOrRows(rows);
  } else {
    condition = 'where id='+id;
    const editrows = await db.query(
      `SELECT * FROM masters ${condition}`
    );
    const masterdata = helper.emptyOrRows(editrows);

    condition = 'where refno='+id;
    const purcharows = await db.query(
      `SELECT * FROM purchase ${condition}`
    );
    let purchasedata = helper.emptyOrRows(purcharows);
    let packdata = '';
    for(var i=0;i<purchasedata.length;i++) {
      const packrows = await db.query(
        `SELECT * FROM 	packpurchase ${condition}`
      );
      packdata = helper.emptyOrRows(packrows);
      purchasedata[i]['packValue'] = packdata;

    }

    const salesrows = await db.query(
      `SELECT * FROM sales ${condition}`
    );
    const salesdata = helper.emptyOrRows(salesrows);

    data = {
      sales: salesdata[0],
      inword: purchasedata,
      outowrd: salesdata
    }
  }
  return data;

}



module.exports = {
  createsalesmaster,
  getSalesId
}