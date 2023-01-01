"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Admin = new Schema({
    adminAccount: { type: String, require: true },
    adminPassword: { type: String, require: true, minLength: 6 },
}, { timestamps: true });
module.exports = mongoose.model('Admin', Admin);
//# sourceMappingURL=Admin.js.map