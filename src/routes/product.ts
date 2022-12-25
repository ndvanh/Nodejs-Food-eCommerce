import express from "express"
import {multer} from "../index"

const upload = multer({ dest: 'src/uploads' })
const router = express.Router()
const productController = require('../controllers/ProductController')
router.get('/:prodType',productController.getProductByType)
router.get('/food/:prodName',productController.getProductByName)
router.get('/',productController.getAllProduct)
router.post('/',upload.single('prodImg'),productController.addProduct)
router.patch('/:_id',upload.single('prodImg'),productController.updateProduct)
router.delete('/delete/:_id',productController.deleteProduct)

module.exports = router