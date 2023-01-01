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
const User = require("../models/User");
class UserController {
    // GET lấy tất cả danh sách người dùng
    getAllUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let page = req.query.page; // param ?page=
                const pageUserSize = 15; // số người dùng trong 1 page
                if (page) {
                    let pageNum = Number(page); // số page hiện tại param ?page=
                    if (pageNum < 1)
                        pageNum = 1;
                    const skipUserNum = (pageNum - 1) * pageUserSize; // số người dùng bỏ qua khi chuyển
                    const user = yield User.find({}).sort({ createdAt: -1 }).skip(skipUserNum).limit(pageUserSize);
                    const sumUser = yield User.countDocuments({}); // tổng số người dùng
                    const pageSum = Math.ceil(sumUser / pageUserSize); // tổng số page tương ứng
                    res.json({ pageSum: pageSum, data: user });
                }
                else {
                    const news = yield User.find({}).sort({ createdAt: -1 });
                    res.json(news);
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    // POST thêm người dùng (đăng ký)
    addUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email = yield User.findOne({ userMail: req.body.userMail });
                if (email)
                    res.status(409).send('Tài khoản đã tồn tại (Email đã tồn tại)');
                else {
                    const user = new User(req.body);
                    yield user.save();
                    res.json();
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    // POST đăng nhập
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userAccount = yield User.findOne({ userMail: req.body.userMail, userPassword: req.body.userPassword });
                if (userAccount)
                    res.json(userAccount);
                else
                    res.status(401).send('Tài khoản hoặc mật khẩu không đúng');
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    // PATCH cập nhật menu
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield User.updateOne({ _id: req.params._id }, req.body);
                res.json();
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    // DELETE xóa người dùng
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield User.findByIdAndRemove(req.params._id);
                res.json();
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
module.exports = new UserController;
//# sourceMappingURL=UserController.js.map