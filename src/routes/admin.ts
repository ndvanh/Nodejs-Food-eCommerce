const express = require('express')
const router = express.Router()

const adminController = require('../controllers/AdminController')

router.post('/login',adminController.loginAdmin)

module.exports = router
export {} // chuyển file thành ES module

