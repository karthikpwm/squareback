const sha256 = require('js-sha256')
const jwt = require('jwt-then')
const Guest = require('../models/Guest')

exports.newregister = async (req, res) => {
  //const { name, email, password, company_id } = req.body;
  //console.log(req.body)
  const result = await Guest.insertcandidate(req.body)

  const token = await jwt.sign({ id: result.id }, process.env.SECRET, { expiresIn: '1800s' })

  res.json({
    token,
    insert_id: result
  })
}
