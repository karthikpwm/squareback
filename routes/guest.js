const router = require('express').Router()

const { catchErrors } = require('../handlers/errorHandler')
const guestController = require('../controllers/guestController')


router.post("/newregister", catchErrors(guestController.newregister))
//console.log("haiii")

module.exports = router