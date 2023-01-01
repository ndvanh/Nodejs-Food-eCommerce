"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Menu = new Schema({
    menuType: { type: String, maxLength: 50, require: true },
    imgMenu: { type: String, require: true },
}, { timestamps: true });
module.exports = mongoose.model('Menu', Menu);
//# sourceMappingURL=Menu.js.map