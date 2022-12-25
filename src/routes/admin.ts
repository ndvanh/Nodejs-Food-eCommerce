import express from "express"

const router = express.Router()
const adminController = require('../controllers/AdminController')

router.post('/login',adminController.loginAdmin)

module.exports = router


