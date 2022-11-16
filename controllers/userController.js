const sha256 = require('js-sha256')
const jwt = require('jwt-then')
const User = require('./../models/User')
const fs = require('fs');

exports.register = async (req, res) => {
  const { name, email, password, company, usertype } = req.body;

  // const emailRegx = /@gmail.com/;
  //console.log(req.body)
  // if(!emailRegx.test(email)) throw "Email is not supported form your domain"
  if (password.length < 6) throw "Password must be atleast 6 characters long"
  const userExits = await User.findOneEmail({ email })
  if (userExits.length !== 0) throw "User Email Already Exist";

  await User.create({ name, email, password: sha256(password + process.env.SALT), company, usertype })

  res.json({
    message: `User [${name}] registered successfully`
  })
};

exports.login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.connection({ email, password: sha256(password + process.env.SALT), })
  //console.log('userdetails', user[0].company_id, user.length)
  if (!user || user.length === 0) throw "Email and Password did not match"
  // const companydet = await User.getonecomp({ comp: user[0].company_id })
  const token = await jwt.sign({ id: user.id }, process.env.SECRET)

  //console.log(token)
  res.json({
    user: user[0],
    message: user.email + "User logged successfully",
    //companydetail: companydet[0],
    token,
  })
}
exports.checkpassword = async (req, res) => {
  const { password } = req.body
  const validation = await User.checkpassword({ password })
  if (!validation || validation.length === 0) throw "Password did not match"
  res.json({
    data: 'true'
  })
}
exports.logout = async (req, res) => {
  jwt.destry()
}
exports.getuserdetails = async (req, res) => {
  let data = await User.getuserdetails();

  res.json({ data: data })
};
exports.editpassword = async (req, res) => {
  if (Object.keys(req.params).length === 0 && req.params.userid === undefined) {
    throw '400:Parameter not Valid'
  }
  const { name, password, email, company_id, apassword } = req.body
  let result = await User.editpassword(req.params.userid, { name, email, password: sha256(password + process.env.SALT), company_id, apassword })
  res.json({ data: result })
}

exports.deleteuser = async (req, res) => {
  if (Object.keys(req.params).length === 0 && req.params.userid === undefined) {
    throw '400:Parameter not Valid'
  }

  const result = await User.deleteuser(req.params)
  res.json({
    message: 'record deleted successfully'
  })

};

exports.selectupdate = async (req, res) => {
  if (Object.keys(req.params).length === 0 && req.params.candidate_id === undefined) {
    throw '400:Parameter not Valid'
  }

  const result = await User.selectupdate(req.params.candidate_id)
  res.json({
    message: 'record updated successfully'
  })

};
exports.createcompany = async (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    throw '400:Parameter not Valid'
  }
  const result = await User.createcompany(req.body)
  res.json({
    message: 'company added successfully',
    insert_id: result
  })
}
exports.getcompdetails = async (req, res) => {
  let data = await User.getcompdetails();

  res.json({
    data: data
  })
};
exports.addcategory = async (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    throw '400:Parameter not Valid'
  }
  const result = await User.addcategory(req.body)
  res.json({
    message: 'successfully added',
    result: result
  })
}
exports.getcategories = async (req, res) => {
  let data = await User.getcategories();

  res.json({
    data: data
  })


}
exports.getcategory = async (req, res) => {

  const data = await User.getcategory()
  res.json({
    data: data
  })
}
exports.creditupdate = async (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    throw '400:Parameter not Valid'
  }

  const result = await User.creditupdate(req.body)
  res.json({
    message: 'added',
    result: result
  })
}
exports.getcv = async (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    throw '400:Parameter not Valid'
  }
  const { candidate_id } = req.body
  const result = await User.getcv({ candidate_id })
  res.json({
    data: result,

  })
}
exports.downloadfile = async (req, res) => {

  const { filename } = req.params
  let result = fs.readFileSync(`${__dirname}/../public/${filename}`, 'base64')
  res.json(result)
}
exports.questionupload = async (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    throw '400:Parameter not Valid'
  }
  const { data, toDate } = req.body
  const result = await User.questionupload(data, toDate)
  res.json({
    message: 'questions uploaded',
    result: result
  })

}
exports.editcredit = async (req, res) => {
  if (Object.keys(req.params).length === 0 && req.params.userid === undefined) {
    throw '400:Parameter not Valid'
  }
  const { credit } = req.body
  let result = await User.editcredit(req.params.userid, { credit })
  res.json({ data: result })
}