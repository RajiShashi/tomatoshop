const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const { async } = require('rxjs');


async function createsalesmaster(request) {
  if (request.sales['id']) {
    // update data
    const salesid = request.sales['id'];
    const result = await db.query(
      `Update masters set
       date = '${helper.convertDate(request.sales.date)}', 
        credit = '${request.sales.credit}', 
        debit = '${request.sales.debit}', 
        billdate ='${request.sales.date}', 
        amount =  '${request.sales.totalamount}', 
        commission = '${request.sales.commission}',
        rent ='${request.sales.rent}',
        cooly = '${request.sales.wages}',
        sungam = '${request.sales.toll}' 
        where id = ${salesid}
      `
    );

    let message = "salesmaster error";

    if (result.affectedRows) {
      message = 'Salesmaster created successfully';
    }
    // Inwards data update
    await db.query(`DELETE FROM purchase where refno=${request.sales['id']}`);
    await db.query(`DELETE FROM sales where refno=${request.sales['id']}`);
    await db.query(`DELETE FROM packpurchase where refno=${request.sales['id']}`);

    for (var i = 0; i < request.inwards.length; i++) {
      
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
      ( '${helper.convertDate(request.sales.date)}',
        '${salesid}',
        '${request.sales.customerid}',
        '${request.inwards[i].product}', 
        '${request.inwards[i].kgs}',
        '${request.inwards[i].pack}',
        '${request.inwards[i].rate}',
        '${request.inwards[i].amount}',
        '${request.inwards[i].product}',
        'KGS',
        '${request.inwards[i].commission}',
        '${request.sales.rent}',
        '${request.inwards[i].wages}',
        '${request.inwards[i].toll}',
        '1'
        )`
      );

      const purchaseid = result_inwords.insertId;
      for (var j = 0; j < request.inwards[i].packValue.length; j++) {
        const result_pack = await db.query(
          `INSERT INTO packpurchase 
           (date,
            purchaseid,
            refno, 
            product, 
            qty,
            sno
           )
           VALUES 
           ( '${helper.convertDate(request.sales.date)}',
             '${purchaseid}',
             '${salesid}',
             '${request.inwards[i].product}',
             '${request.inwards[i].packValue[j].qty}',
             '${j + 1}'
           )`
        );

      }

    }

    for (var i = 0; i < request.outwards.length; i++) {
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
        ( '${helper.convertDate(request.sales.date)}',
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

    return { message };



  } else {
    // insert data
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
    ('${helper.convertDate(request.sales.date)}',
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
    
    //const refno = getrefno[0].refno+1;
    for (var i = 0; i < request.inwards.length; i++) {
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
    ( '${helper.convertDate(request.sales.date)}',
      '${salesid}',
      '${request.sales.customerid}',
      '${request.inwards[i].product}', 
      '${request.inwards[i].kgs}',
      '${request.inwards[i].pack}',
      '${request.inwards[i].rate}',
      '${request.inwards[i].amount}',
      '${request.inwards[i].product}',
      'KGS',
      '${request.inwards[i].commission}',
      '${request.sales.rent}',
      '${request.inwards[i].wages}',
      '${request.inwards[i].toll}',
      '1'
      )`
      );

      const purchaseid = result_inwords.insertId;
      for (var j = 0; j < request.inwards[i].packValue.length; j++) {
        const result_pack = await db.query(
          `INSERT INTO packpurchase 
         (date,
          purchaseid,
          refno, 
          product, 
          qty,
          sno
         )
         VALUES 
         ( '${helper.convertDate(request.sales.date)}',
           '${purchaseid}',
           '${salesid}',
           '${request.inwards[i].product}',
           '${request.inwards[i].packValue[j].qty}',
           '${j + 1}'
         )`
        );

      }

    }


    for (var i = 0; i < request.outwards.length; i++) {
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
      ( '${helper.convertDate(request.sales.date)}',
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

    return { message };
  }
}

async function getSalesId(id) {
  let condition = '';
  let data = '';
  if (id == 0) {
    condition = 'ORDER BY billno DESC LIMIT 1';
    const rows = await db.query(
      `SELECT * FROM masters ${condition}`
    );
    data = helper.emptyOrRows(rows);
  } else {
    condition = 'where id=' + id;
    const editrows = await db.query(
      `SELECT * FROM masters ${condition}`
    );
    const masterdata = helper.emptyOrRows(editrows);

    condition = 'where refno=' + id;
    const purcharows = await db.query(
      `SELECT * FROM purchase ${condition}`
    );
    let purchasedata = helper.emptyOrRows(purcharows);
    let packdata = '';
    for (var i = 0; i < purchasedata.length; i++) {
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
      sales: masterdata[0],
      inwords: purchasedata,
      outowrds: salesdata
    }
  }
  return data;

}

async function receiptUpdate(request) {
  const result = await db.query(
    `INSERT INTO masters 
   (date, 
    name, 
    credit,
    reason, 
    billdate,
    billno,
    type,
    billbook,
    salesman,
    amount,
    discount
    ) 
  VALUES 
  ('${helper.convertDate(request.date)}',
   '${request.customername}',
   '${request.downpayment}', 
   'RECEIPT',
   '${request.date}', 
   '1001',
   'RECEIPT',
   'BILL BOOK', 
   'SALES MAN',
   '${request.downpayment}', 
   '${request.discount}'
   
   )`
  );

  let message = "salesmaster error";

  if (result.affectedRows) {
    message = 'receipt created successfully';
  }
}

async function salesUpdate(request) {
  const salesrows = await db.query(
    `SELECT billno FROM sales order by billno desc limit 1`
  );
  console.log(salesrows[0]);
  const salesbillno = Number(salesrows[0].billno)+1;
  let printupdate = '';
  if(request['noofprint']) {
    printupdate = ', noofprint = 1 ';
  }  
  const salesrowsupdate = await db.query(
    `update sales set billno='${salesbillno}', cooly = '${request.cooley}' ${printupdate} where businessmen = '${request.customername}' and billno='0'`
  );
  
  const result = await db.query(
    `INSERT INTO masters 
   (date, 
    name, 
    debit,
    reason, 
    billdate,
    billno,
    type,
    billbook,
    salesman,
    amount,
    cooly
   
    ) 
  VALUES 
  ('${helper.convertDate(request.date)}',
   '${request.customername}',
   '${request.amount}', 
   'SALES',
   '${request.date}', 
   '${salesbillno}',
   'CUSTOMER',
   'BILL BOOK', 
   'SALES MAN',
   '${request.amount}',
   '${request.cooley}' 
   )`
  );

  let message = "salesmaster error";

  if (result.affectedRows) {
    message = 'receipt created successfully';
  }
}

async function savePrint(request) {
  if (request['id']) {
    // update data
    const salesid = request['id'];
    const result = await db.query(
      `Update purchase set
        noofprint = '${request['print']}' 
        where refno = ${salesid}
      `
    );

    let message = "salesmaster error";

    if (result.affectedRows) {
      message = 'Salesmaster created successfully';
    }
  }
}

async function savesalesPrint(request) {
  if (request['id']) {
    // update data
    const salesid = request['id'];
    const result = await db.query(
      `Update sales set
        noofprint = '${request['print']}' 
        where billno = ${salesid}
      `
    );

    let message = "salesmaster error";

    if (result.affectedRows) {
      message = 'Salesmaster created successfully';
    }
  }
}



module.exports = {
  createsalesmaster,
  getSalesId,
  receiptUpdate,
  salesUpdate,
  savePrint,
  savesalesPrint
}