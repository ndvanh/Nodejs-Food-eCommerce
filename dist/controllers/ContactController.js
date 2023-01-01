"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Contact = require("../models/Contact");
class ContactController {
    // GET lấy tất cả danh sách liên hệ
    getAllContact(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let page = req.query.page; // param ?page=
                const pageContactSize = 15; // số liên hệ trong 1 page
                if (page) {
                    let pageNum = Number(page); // số page hiện tại param ?page=
                    if (pageNum < 1)
                        pageNum = 1;
                    const skipContactNum = (pageNum - 1) * pageContactSize; // số liên hệ bỏ qua khi chuyển
                    const contactItem = yield Contact.find({}).sort({ createdAt: -1 }).skip(skipContactNum).limit(pageContactSize);
                    const sumContact = yield Contact.countDocuments({}); // tổng số liên hệ
                    const pageSum = Math.ceil(sumContact / pageContactSize); // tổng số page tương ứng
                    res.json({ pageSum: pageSum, data: contactItem });
                }
                else {
                    const news = yield Contact.find({}).sort({ createdAt: -1 });
                    res.json(news);
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    // POST thêm liên hệ
    addContact(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contactItem = new Contact(req.body);
                yield contactItem.save();
                res.json();
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    // PATCH cập nhật menu
    updateContact(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Contact.updateOne({ _id: req.params._id }, req.body);
                res.json();
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    // DELETE xóa liên hệ
    deleteContact(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Contact.findByIdAndRemove(req.params._id);
                res.json();
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
module.exports = new ContactController;
//# sourceMappingURL=ContactController.js.map