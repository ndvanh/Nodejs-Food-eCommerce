"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Contact = new Schema({
    nameCt: { type: String, require: true },
    emailCt: { type: String, require: true },
    contentCt: { type: String, require: true },
}, { timestamps: true });
module.exports = mongoose.model('Contact', Contact);
//# sourceMappingURL=Contact.js.map