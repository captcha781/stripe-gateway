const express = require('express')
const ctrl = require('../controllers/main.controller')
const midw = require('../middleware/main.middleware')

const router = express.Router()

router.route('/register').post(ctrl.register)
router.route('/login').post(ctrl.login)
router.route('/info').get(midw, ctrl.info)
router.route('/getIntent').post(midw, ctrl.getPaymentIntent)
router.route('/confirmPayment').post(midw, ctrl.confirmPayment)


module.exports = router