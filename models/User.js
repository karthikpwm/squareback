const { db } = require('../config/config')

exports.create = async (param) => {
  const con = await db.getConnection()
  try {
    //await con.beginTransaction();
    // const test = await con.query("Insert into companydetails (name,credit) value (?, 5)",
    //   [param.company])
    // await con.commit();
    await con.beginTransaction();
    const result = await con.query("INSERT INTO userdetails (name, email, password) VALUE ( ?, ?, ?) ",
      [param.name, param.email, param.password])
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

exports.findOneEmail = async (params) => {
  try {
    let sql = `SELECT * FROM userdetails where email = ?`;
    const result = await db.query(sql, params.email)
    return result[0];
  } catch (e) {
    throw e
  }
}
exports.getonecomp = async (params) => {
  try {
    let sql = `SELECT * FROM companydetails where company_id = ?`;
    const result = await db.query(sql, params.comp)
    //console.log(result[0])
    return result[0];
  } catch (e) {
    throw e
  }
}

exports.connection = async (params) => {
  try {
    //console.log('asdfasdf', params)
    let sql = `SELECT user_id,name,email FROM userdetails where email = ? and password = ?`;

    const result = await db.query(sql, [params.email, params.password])
    //console.log(sql)
    console.log(result,result[0])
    return result[0];

  } catch (e) {
    throw e
  }
}
exports.checkpassword = async (params) => {
  try {
    let sql = 'select apassword from userdetails where apassword = ?'
    const result = await db.query(sql, [params.password])
    return result[0];
  } catch (e) {
    throw e
  }
}
exports.getuserdetails = async () => {
  try {
    let sql = `SELECT userdetails.*,companydetails.credit from userdetails left join companydetails ON userdetails.company_id = companydetails.company_id`;
    const result = await db.query(sql)
    return result[0];
  } catch (e) {
    throw e
  }
}
exports.getcompdetails = async () => {
  try {
    let sql = `SELECT * from companydetails`;
    const result = await db.query(sql)
    return result[0];
  } catch (e) {
    throw e
  }
}
exports.editpassword = async (userid, param) => {
  const con = await db.getConnection()
  try {
    await con.beginTransaction();
    let result = await con.query('update userdetails SET name = ? ,password = ?, email = ?,company_id = ?, apassword = ? where user_id = ?',
      [param.name, param.password, param.email, param.company_id, param.apassword, userid])
    await con.commit();
    return result

  } catch (err) {
    con.rollback()
    throw err
  } finally {
    con.close();
  }
}
exports.selectupdate = async (candidate_id) => {
  const con = await db.getConnection()
  try {
    await con.beginTransaction();
    let result = await con.query('UPDATE candidatetestlog SET selection = ? WHERE candidate_id = ?',
      [1, candidate_id])
    //console.log(result)
    await con.commit();
    return true

  } catch (err) {
    con.rollback()
    throw err
  } finally {
    con.close();
  }
}
exports.getcv = async (params) => {
  try {
    let sql = `SELECT cv from candidatedetails where candidate_id =?`;
    const result = await db.query(sql, [params.candidate_id])
    //.log(result)
    return result[0];
  } catch (e) {
    throw e
  }
}

exports.deleteuser = async (param) => {
  try {
    let sql = `DELETE FROM userdetails where user_id=?`;
    const result = await db.query(sql, [param.userid])
    return true;
  } catch (e) {
    throw e
  }
}
exports.createcompany = async (param) => {
  const con = await db.getConnection()
  try {
    await con.beginTransaction();
    const result = con.query('INSERT into companydetails(name) value (?)',
      [param.name])
    await con.commit();
    return result[0];
  } catch (err) {
    //console.log(err)
    await con.rollback();
    throw err;
  } finally {
    con.close()
  }

}
exports.addcategory = async (param) => {
  const con = await db.getConnection()
  try {
    await con.beginTransaction()
    const result = con.query('insert into categories(category,company_id) values (? , ?)',
      [param.category, param.company_id])
    await con.commit();
    return result
  } catch (err) {
    //console.log(err)
    await con.rollback();
    throw err;
  } finally {
    con.close()
  }
}
exports.getcategories = async () => {
  try {
    let sql = `SELECT DISTINCT(categories.category_id), categories.category,categories.company_id,companydetails.credit,questions.category_id as qstncatid from categories LEFT JOIN companydetails ON categories.company_id = companydetails.company_id LEFT JOIN questions ON categories.category_id = questions.category_id where questions.category_id IS NOT NULL`;
    const result = await db.query(sql)
    return result[0];
  } catch (e) {
    throw e
  }
}
exports.getcategory = async () => {
  try {
    let sql = `SELECT categories.*,companydetails.credit from categories LEFT JOIN companydetails ON categories.company_id = companydetails.company_id`;
    const result = await db.query(sql)
    return result[0];
  } catch (e) {
    throw e
  }
  // const con = await db.getConnection()
  // try {
  //   await con.beginTransaction();

  //   let result = await con.query(`select * from categories where category_id IN (${param.category_id})`)

  //   await con.commit();
  //   return result[0]

  // } catch (err) {
  //   con.rollback()
  //   throw err
  // } finally {
  //   con.close();
  // }
}
exports.creditupdate = async (param) => {
  const con = await db.getConnection()
  try {
    await con.beginTransaction();
    let sql = 'select credit from companydetails where company_id = ?';
    const sqlresult = await db.query(sql, [param.company_id])
    let creditlimit = sqlresult[0][0]['credit']
    //console.log(sqlresult[0][0]['credit'])
    await con.commit();


    let creditremain = parseInt(creditlimit) + parseInt(param.credit)
    await con.beginTransaction();
    let result = con.query('update companydetails set credit = ? where company_id = ?', [creditremain, param.company_id])
    await con.commit();
    //console.log(result[0][0].insertId)
    return result[0]


  } catch (err) {
    //console.log(err)
    await con.rollback();
    throw err;
  } finally {
    con.close()
  }

}
exports.questionupload = async (params, date) => {
  const con = await db.getConnection()
  await con.beginTransaction();
  let i = 0;
  let bulk_data = []
  for (const param of params) {
    await bulk_data.push([param.question, param.options, param.answer, date])
    i = i + 1;

  }

  //console.log(bulk_data)
  let sql = 'insert into customquestions (question,options,answer,uniquedate) values ?'

  let result = await con.query(sql, [bulk_data])
  await con.commit();
  return result[0]
}
exports.editcredit = async (userid, param) => {
  const con = await db.getConnection()
  try {
    await con.beginTransaction();
    let result = await con.query('update companydetails SET credit = ? where company_id = ?',
      [param.credit, userid])

    await con.commit();
    return result

  } catch (err) {
    con.rollback()
    throw err
  } finally {
    con.close();
  }
}