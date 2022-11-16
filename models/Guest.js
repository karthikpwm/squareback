const { db } = require('../config/config')

exports.insertcandidate = async (param) => {
  const con = await db.getConnection()
  try {
    await con.beginTransaction();
    const result = await con.query("INSERT INTO candidatedetails (name,position, email, mobile,company_id,ctc,pincode,category_id,cv) VALUE ( ?, ?, ?, ?, ?,?,?,?,? ) ",
      [param.name, param.position, param.email, param.mobile, param.company_id, param.ctc, param.pincode, param.category_id, param.cv])
    await con.commit();
    await con.beginTransaction();
    const test = await con.query("INSERT INTO candidatetestlog (candidate_id,test, createdate,company_id,timelimit,category_id,selection) VALUE ( ?, ?, NOW(), ?, ?, ?, ?) ",
      [result[0].insertId, 0, param.company_id, param.timelimit, param.category_id, 0])
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