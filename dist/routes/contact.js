"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const contactController = require('../controllers/ContactController');
router.get('/', contactController.getAllContact);
router.post('/', contactController.addContact);
router.patch('/:_id', contactController.updateContact);
router.delete('/delete/:_id', contactController.deleteContact);
module.exports = router;
//# sourceMappingURL=contact.js.map