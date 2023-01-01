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
const Admin = require("../models/Admin");
class AdminController {
    // POST đăng nhập
    loginAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminAccount = yield Admin.findOne({ adminAccount: req.body.adminAccount, adminPassword: req.body.adminPassword });
                if (adminAccount)
                    res.json(adminAccount);
                else
                    res.status(401).send('Tài khoản hoặc mật khẩu không đúng');
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
module.exports = new AdminController;
//# sourceMappingURL=AdminController.js.map