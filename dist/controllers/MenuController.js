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
const Menu = require("../models/Menu");
const fs = require('fs');
require("dotenv").config();
class MenuController {
    // GET lấy tất cả danh sách menu
    getAllMenu(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const menu = yield Menu.find({});
                res.json(menu);
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    // POST thêm menu
    addMenu(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                req.body.imgMenu = `${process.env.API_URL}/uploads/${req.file.filename}`;
                const menuItem = new Menu(req.body);
                yield menuItem.save();
                res.json();
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    // PATCH cập nhật menu
    updateMenu(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.body.imgMenu === '') {
                    const menuItem = Menu.findById(req.params._id);
                    req.body.imgMenu = menuItem.imgMenu;
                    yield Menu.updateOne({ _id: req.params._id }, req.body);
                    res.json();
                }
                else {
                    // const filter = {_id:req.params._id}
                    req.body.imgMenu = `${process.env.API_URL}/uploads/${req.file.filename}`;
                    yield Menu.updateOne({ _id: req.params._id }, req.body);
                    res.json();
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    // DELETE xóa menu
    deleteMenu(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const menuItem = yield Menu.findById(req.params._id);
                yield fs.unlink(`./src/uploads/${menuItem.imgMenu.split('/').slice(-1)}`, (err) => {
                    if (err)
                        console.log(err);
                });
                yield menuItem.remove();
                res.json();
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
module.exports = new MenuController;
//# sourceMappingURL=MenuController.js.map