const sha256 = require('js-sha256')
const jwt = require('jwt-then')
const Newbuy = require('../models/Newbuy')

exports.insertbuy = async (req, res) => {
  //const { name, email, password, company_id } = req.body;
  //console.log(req.body)
  const result = await Newbuy.insertbuy(req.body.details)
  

  res.json({
    insert_id: result
  })
}
exports.insertoverall = async (req, res) => {
  console.log(req.body)
  const result = await Newbuy.insertoverall(req.body.details)

  res.json({
    response: result
  })
}

exports.insertexistindividual = async (req, res) => {
  const result = await Newbuy.insertexistindividual(req.body.details)
  res.json({
    response: result
  })
}
exports.insertexistoverall = async (req, res) => {
  const result = await Newbuy.insertexistoverall(req.body.details)
  res.json({
    response: result
  })
}
exports.iname = async (req, res) => {
  const result = await Newbuy.iname(req.body.iname)
  res.json({
    response: result
  })
}
exports.oname = async (req, res) => {
  const result = await Newbuy.oname(req.body)
  res.json({
    response: result
  })
}
exports.getbuy = async (req, res) => {
  let data = await Newbuy.getbuy();

  res.json({ data: data })
}
exports.getbuyoverall = async (req, res) => {
  let data = await Newbuy.getbuyoverall(req.params);

  res.json({ data: data })
}
exports.getexindi = async (req, res) => {
  let data = await Newbuy.getexindi(req.params);

  res.json({ data: data })
}
exports.getiname = async (req, res) => {
  let data = await Newbuy.getiname();

  res.json({ data: data })
}
exports.getoname = async (req, res) => {
  let data = await Newbuy.getoname();

  res.json({ data: data })
}
// exports.existbuyoverall = async (req, res) => {
//   const result = await Newbuy.existbuyoverall(req.body.clientdetails)
//   res.json({
//     response: result
//   })
// }
exports.onameupdate = async (req, res) => {
  
  let result = await Newbuy.onameupdate(req.body)
  res.json({ data: result })
};
exports.getexistbuy = async (req, res) => {
  let data = await Newbuy.getexistbuy();

  res.json({ data: data })
}
exports.getexistindividual = async(req, res) => {
  let data = await Newbuy.getexistindividual();

  res.json({ data: data })
}
exports.getbuyindividual = async(req, res) => {
  let data = await Newbuy.getbuyindividual();

  res.json({ data: data })
}