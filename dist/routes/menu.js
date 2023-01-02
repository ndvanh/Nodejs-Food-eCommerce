"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'dist/uploads' });
const router = express.Router();
const menuController = require('../controllers/MenuController');
router.get('/', menuController.getAllMenu);
router.post('/', upload.single('imgMenu'), menuController.addMenu);
router.patch('/:_id', upload.single('imgMenu'), menuController.updateMenu);
router.delete('/delete/:_id', menuController.deleteMenu);
module.exports = router;
//# sourceMappingURL=menu.js.map