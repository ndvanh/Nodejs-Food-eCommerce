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
const Order = require("../models/Order");
class OrderController {
    // GET lấy tất cả danh sách đơn hàng
    getAllOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let page = req.query.page; // param ?page=
                const pageOrderSize = 15; // số đơn hàng trong 1 page
                if (page) {
                    let pageNum = Number(page); // số page hiện tại param ?page=
                    if (pageNum < 1)
                        pageNum = 1;
                    const skipOrderNum = (pageNum - 1) * pageOrderSize; // số đơn hàng bỏ qua khi chuyển
                    const newsItem = yield Order.find({}).sort({ createdAt: -1 }).skip(skipOrderNum).limit(pageOrderSize);
                    const sumOrder = yield Order.countDocuments({}); // tổng số đơn hàng
                    const pageSum = Math.ceil(sumOrder / pageOrderSize); // tổng số page tương ứng
                    res.json({ pageSum: pageSum, data: newsItem });
                }
                else {
                    const news = yield Order.find({}).sort({ createdAt: -1 });
                    res.json(news);
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    // GET lấy đơn hàng theo tên khách hàng
    getOrderByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderList = yield Order.find({ userName: req.params.userName }).sort({ createdAt: -1 });
                res.json(orderList);
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    // POST thêm đơn hàng
    addOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = new Order(req.body);
                yield order.save();
                res.json();
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    // PATCH cập nhật menu
    updateOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Order.updateOne({ _id: req.params._id }, req.body);
                res.json();
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    // DELETE xóa đơn hàng
    deleteOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Order.findByIdAndRemove(req.params._id);
                res.json();
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
module.exports = new OrderController;
//# sourceMappingURL=OrderController.js.map