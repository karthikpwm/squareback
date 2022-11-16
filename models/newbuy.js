const { db } = require('../config/config')
const moment = require('moment')

exports.insertbuy = async (params) => {
  const con = await db.getConnection()
  try {
    await con.beginTransaction();
    let date = moment().format('yyyy-mm-D')
    let i = 0;
    let bulk_data = []
    for (const param of params) {
      await bulk_data.push([param.stockname, param.qty, param.name,param.total,date,param.allocation,param.in,param.cmp,param.stockname])
      i = i + 1;

    }
    console.log(bulk_data)
    await con.query("truncate table newbuy")
    let sql  = "INSERT INTO newbuy (stockname,quantity,name,total,date,allocation,invest,cmp,code) VALUE (?,?,?,?,?,?,?,?,?)"
    let result = await con.batch(sql, bulk_data)
    console.log(result)
    await con.commit();
   
    return result[0].insertId;
  } catch (err) {
    //console.log(err)
    await con.rollback();
    throw err;
  } finally {
    con.close()
  }
}

exports.insertoverall = async (params) => { 
  const con = await db.getConnection()
  try {

    await con.beginTransaction()
    let i = 0;
    let bulk_data = []
    for (const param of params) {
      await bulk_data.push([param.name,param.allocation,param.CurrentPrice,param.Quantity,param.cash,param.InvestAmt])
      i = i + 1;
    }
    console.log(bulk_data)
    await con.query("truncate table newbuyoverall")
    let sql  = "INSERT INTO newbuyoverall (name,allocated,cmp,quantities,cash,investamt) VALUE (?,?,?,?,?,?) "
    let result = await con.batch(sql, bulk_data)
    await con.commit();
  }
  catch (err) {
    await con.rollback();
    throw err;
  } finally {
    con.close()
  }
}

exports.insertexistindividual = async (params) => { 
  const con = await db.getConnection()
  try {

    await con.beginTransaction()
    let i = 0;
    let bulk_data = []
    for (const param of params) {
      await bulk_data.push([param.adjust,param.allocation,param.allocdiff, param.calctobe, param.cashperc, param.cmp, param.differ, param.marketvalue,param.name, param.overalloldqty, param.overalltotal, param.qtydiffer, param.quantity, param.reference, param.totalqty, param.totalqtydiffer,param.stockname, param.client,param.nmp])
      i = i + 1;
    }
    console.log(bulk_data)
    await con.query("truncate table existingindividual")
    let sql  = "INSERT INTO existingindividual(adjust, allocation, allocdiff, calctobe, cashperc, cmp, differ, marketvalue, name, overalloldqty, overalltotal, qtydiffer, quantity, reference, totalqty, totalqtydiffer, code, client, nmp) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,? )"
    let result = await con.batch(sql, bulk_data)
    await con.commit();
  }
  catch (err) {
    await con.rollback();
    throw err;
  } finally {
    con.close()
  }
}

exports.insertexistoverall = async (params) => { 
  const con = await db.getConnection()
  try {

    await con.beginTransaction()
    let i = 0;
    let bulk_data = []
    for (const param of params) {
      await bulk_data.push([param.client, param.code,'2022-11-11',param.adjust,param.allocation,param.backupquan, param.calctobe, param.cashperdiff,param.cmp,  param.marketvalue,param.newquantity, param.nmp, param.quantity])
      i = i + 1;
    }
    console.log(bulk_data)
    await con.query("truncate table existingbuy")
    let sql  = "INSERT INTO existingbuy(`client`, `code`, `date`, `adjust`, `allocation`, `backupquan`, `calctobe`, `cashperdiff`,`cmp`,`marketvalue`, `newquantity`, `nmp`, `quantity`) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?) "
    let result = await con.batch(sql, bulk_data)
    await con.commit();
  }
  catch (err) {
    await con.rollback();
    throw err;
  } finally {
    con.close()
  }
}
exports.getbuy = async () => {
  try {
    let sql = `SELECT * FROM newbuyoverall`;
    const result = await db.query(sql)
    delete result.meta;
    return result;
  } catch (e) {
    throw e
  }
}
exports.getexistbuy = async () => {
  try {
    let sql = `SELECT * FROM existingbuy`;
    const result = await db.query(sql)
    delete result.meta;
    return result;
  } catch (e) {
    throw e
  }
}

exports.getbuyoverall = async (param) => {
  try {
    let sql = `SELECT * FROM newbuy where stockname = ?`;
    const result = await db.query(sql, [param.name])
    delete result.meta;
    return result;
  } catch (e) {
    throw e
  }
}
exports.getbuyindividual = async () => {
  try {
    let sql = `SELECT * FROM newbuy`;
    const result = await db.query(sql)
    delete result.meta;
    return result;
  } catch (e) {
    throw e
  }
}
exports.getexindi = async (param) => {
  try {
    let sql = `SELECT * FROM existingindividual where client = ?`;
    const result = await db.query(sql, [param.client])
    delete result.meta;
    return result;
  } catch (e) {
    throw e
  }
}
exports.getexistindividual = async () => {
  try {
    let sql = `SELECT * FROM existingindividual where code != '' `;
    const result = await db.query(sql)
    delete result.meta;
    return result;
  } catch (e) {
    throw e
  }
}
exports.getiname = async () => {
  try {
    let sql = `select * from iname`;
    const result = await db.query(sql)
    delete result.meta;
    return result;
  } catch (e) {
    throw e
  }
}
exports.getoname = async () => {
  try {
    let sql = `select cashperc,marketvalue from oname`;
    const result = await db.query(sql)
    delete result.meta;
    return result;
  } catch (e) {
    throw e
  }
}
exports.iname = async (params) => { 
  const con = await db.getConnection()
  try {

    await con.beginTransaction()
    let i = 0;
    let bulk_data = []
    for (const param of params) {
      await bulk_data.push([param.name,param.cashperc,param.investamt,param.balance])
      i = i + 1;
    }
    console.log(bulk_data)
    await con.query("truncate table iname")
    let sql  = "INSERT INTO iname(`name`, `cashperc`, `investamt`, `balance`) VALUE (?,?,?,?) "
    let result = await con.batch(sql, bulk_data)
    await con.commit();
  }
  catch (err) {
    await con.rollback();
    throw err;
  } finally {
    con.close()
  }
}
exports.oname = async (param) => { 
  const con = await db.getConnection()
  try {

    await con.beginTransaction()
    
    await con.query("truncate table oname")
    const result = await con.query("INSERT INTO oname(`cashperc`, `marketvalue`) VALUE (?, ?) ",[param.cashperc,param.marketvalue])
    await con.commit();
  }
  catch (err) {
    await con.rollback();
    throw err;
  } finally {
    con.close()
  }
}
exports.onameupdate = async (param) => {
  const con = await db.getConnection()
  try {
    await con.beginTransaction();
    const result = await con.query("update oname SET cashperc = ?",
      [param.cashperc])
    await con.commit();
    return result;
  } catch (err) {
    await con.rollback();
    throw err;
  } finally {
    con.close()
  }
}