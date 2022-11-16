const router = require('express').Router()
const auth = require('../middlewares/auth')

const { catchErrors } = require('../handlers/errorHandler')
const tokenController = require('../controllers/tokenController')

router.post("/jwt", catchErrors(tokenController.jwtCheck))
router.get("/jwtverify/:newtoken", catchErrors(tokenController.jwtVerifyToken))

module.exports = router