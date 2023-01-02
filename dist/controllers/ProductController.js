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
const Product = require("../models/Product");
const fs = require('fs');
require("dotenv").config();
class ProductController {
    // GET lấy tất cả sản phẩm
    getAllProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let page = req.query.page; // param ?page=
                const pageProdSize = 8; // số sp trong 1 page
                if (page) {
                    let pageNum = Number(page); // số page hiện tại param ?page=
                    if (pageNum < 1)
                        pageNum = 1;
                    const skipProductNum = (pageNum - 1) * pageProdSize; // số sp bỏ qua khi chuyển
                    const menuItem = yield Product.find({}).sort({ createdAt: -1 }).skip(skipProductNum).limit(pageProdSize);
                    const sumProd = yield Product.countDocuments({}); // tổng số sp
                    const pageSum = Math.ceil(sumProd / pageProdSize); // tổng số page tương ứng
                    res.json({ pageSum: pageSum, data: menuItem, });
                }
                else {
                    const allMenuItem = yield Product.find({}).sort({ createdAt: -1 });
                    res.json(allMenuItem);
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    // GET lấy sản phẩm theo loại sản phẩm 
    getProductByType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let page = req.query.page;
                const pageProdSize = 8;
                if (page) {
                    let pageNum = Number(page);
                    if (pageNum < 1)
                        pageNum = 1;
                    const skipProductNum = (pageNum - 1) * pageProdSize;
                    const menuItem = yield Product.find({ prodType: req.params.prodType }).sort({ createdAt: -1 }).skip(skipProductNum).limit(pageProdSize);
                    const sumProd = yield Product.countDocuments({ prodType: req.params.prodType });
                    const pageSum = Math.ceil(sumProd / pageProdSize);
                    res.json({ pageSum: pageSum, data: menuItem, });
                }
                else {
                    const allMenuItemType = yield Product.find({ prodType: req.params.prodType }).sort({ createdAt: -1 });
                    res.json(allMenuItemType);
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    // GET lấy sản phẩm theo tên 
    getProductByName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productName = yield Product.findOne({ prodName: req.params.prodName });
                res.json(productName);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    // POST thêm sp
    addProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                req.body.prodImg = `${process.env.API_URL}/uploads/${req.file.filename}`;
                const productItem = new Product(req.body);
                yield productItem.save();
                res.json();
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    // PATCH cập nhật sp
    updateProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.body.prodImg === '') {
                    const productItem = Product.findById(req.params._id);
                    req.body.prodImg = productItem.prodImg;
                    yield Product.updateOne({ _id: req.params._id }, req.body);
                    res.json();
                }
                else {
                    // const filter = {_id:req.params._id}
                    req.body.prodImg = `${process.env.API_URL}/uploads/${req.file.filename}`;
                    yield Product.updateOne({ _id: req.params._id }, req.body);
                    res.json();
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    // PATCH cập nhật số lượng sp
    updateQuantity(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cartList = req.body;
                cartList.map((item) => __awaiter(this, void 0, void 0, function* () {
                    const filter = { prodName: item.prodName };
                    const update = { quantity: item.quantity - (item.qty || 1) };
                    yield Product.findOneAndUpdate(filter, update);
                    res.json();
                }));
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    // DELETE xóa sp
    deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const prodItem = yield Product.findById(req.params._id);
                yield fs.unlink(`./src/uploads/${prodItem.prodImg.split('/').slice(-1)}`, (err) => {
                    if (err)
                        console.log(err);
                });
                yield prodItem.remove();
                res.json();
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
module.exports = new ProductController;
//# sourceMappingURL=ProductController.js.map