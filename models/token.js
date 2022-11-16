const { NULL } = require('mysql/lib/protocol/constants/types');
const { db } = require('../config/config')

exports.creditupdate = async (param) => {
  const con = await db.getConnection()
  try {
    await con.beginTransaction();
    let sql = 'select credit from companydetails where company_id = ?';
    const sqlresult = await db.query(sql, [param.company_id])
    let creditlimit = sqlresult[0][0]['credit']
    //console.log(sqlresult[0][0]['credit'])
    await con.commit();

    if (creditlimit > 1) {
      let creditremain = creditlimit - 2
      await con.beginTransaction();
      let result = con.query('update companydetails set credit = ? where company_id = ?', [creditremain, param.company_id])
      await con.commit();
      //console.log(result[0][0].insertId)
      return 1
    }
    else {
      //console.log('limit')
      return 0
    }
  } catch (err) {
    //console.log(err)
    await con.rollback();
    throw err;
  } finally {
    con.close()
  }
}