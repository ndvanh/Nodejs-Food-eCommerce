"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/AdminController');
router.post('/login', adminController.loginAdmin);
module.exports = router;
//# sourceMappingURL=admin.js.map