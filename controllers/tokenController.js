const token = require('./../models/token')
const modeltoken = require('./../models/token')

exports.jwtCheck = async (req, res) => {
  const { fromDate, toDate, company_id, category_id, timelimit, type } = req.body

  var jwt = require('jsonwebtoken');
  var result = await modeltoken.creditupdate({ company_id })
  if (result == 0) throw "Not Enough Credits";

  var token = jwt.sign({ company_id: company_id, fromDate: fromDate, toDate: toDate, category_id: category_id, timelimit: timelimit, type: type }, 'shhhhh');
  let decode = jwt.decode(token, 'shhhhh')
  res.json({ decode: decode, token, verify: jwt.verify(token, 'shhhhh'), result: result })
}

exports.jwtVerifyToken = async (req, res) => {
  //console.log(req.params)
  const { newtoken } = req.params
  //console.log('newtoken', newtoken)
  const jwt = require('jsonwebtoken');


  let verify = jwt.verify(newtoken, 'shhhhh')
  //let newToken = jwt.decode(newtoken, 'shhhhh')

  const date = new Date()
  const resdata = []
  //console.log(verify)
  var todate = verify.toDate
  let currenttime = date.getTime()
  //console.log(currenttime)
  //console.log(verify.toDate)
  //console.log(todate)
  if (todate >= currenttime) {
    //console.log(verify)
    res.json({ verify: verify })
  }
  else {
    throw '400:Parameter not Valid'
  }
}