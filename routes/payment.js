const router = require('express').Router()
const auth = require('../middlewares/auth')

const { catchErrors } = require('./../handlers/errorHandler')
const paymentController = require('../controllers/paymentController')


router.post("/create", catchErrors(paymentController.create))
router.post("/verify", catchErrors(paymentController.verify))

module.exports = router

