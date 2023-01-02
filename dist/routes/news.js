"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'dist/uploads' });
const router = express.Router();
const newsController = require('../controllers/NewsController');
router.get('/:newsTitle', newsController.getNewsByTitle);
router.get('/', newsController.getAllNews);
router.post('/', upload.single('imgNews'), newsController.addNews);
router.patch('/:_id', upload.single('imgNews'), newsController.updateNews);
router.delete('/delete/:_id', newsController.deleteNews);
module.exports = router;
//# sourceMappingURL=news.js.map