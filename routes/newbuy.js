const router = require('express').Router()
const auth = require('../middlewares/auth')

const { catchErrors } = require('../handlers/errorHandler')
const newbuyController = require('../controllers/newbuyController')

router.put("/insertbuy", catchErrors(newbuyController.insertbuy))
router.put("/insertoverall", catchErrors(newbuyController.insertoverall))
router.put("/insertexistindividual", catchErrors(newbuyController.insertexistindividual))
router.put("/insertexistoverall", catchErrors(newbuyController.insertexistoverall))
router.get("/getbuy", catchErrors(newbuyController.getbuy))
router.get("/getbuyoverall/:name", catchErrors(newbuyController.getbuyoverall))
router.put("/iname", catchErrors(newbuyController.iname))
router.put("/oname", catchErrors(newbuyController.oname))
router.get("/getiname", catchErrors(newbuyController.getiname))
router.get("/getoname", catchErrors(newbuyController.getoname))
//router.put("/existbuyoverall" , catchErrors(newbuyController.existbuyoverall))
router.put("/onameupdate", catchErrors(newbuyController.onameupdate))
router.get("/getexistbuy", catchErrors(newbuyController.getexistbuy))
router.get("/getexindi/:client", catchErrors(newbuyController.getexindi))
router.get("/getexistindividual", catchErrors(newbuyController.getexistindividual))
router.get("/getbuyindividual", catchErrors(newbuyController.getbuyindividual))
module.exports = router