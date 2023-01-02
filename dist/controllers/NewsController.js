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
const News = require("../models/News");
const fs = require('fs');
require("dotenv").config();
class NewsController {
    // GET lấy tất cả danh sách tin tức
    getAllNews(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let page = req.query.page; // param ?page=
                const pageNewsSize = 6; // số bài tin trong 1 page
                if (page) {
                    let pageNum = Number(page); // số page hiện tại param ?page=
                    if (pageNum < 1)
                        pageNum = 1;
                    const skipNewsNum = (pageNum - 1) * pageNewsSize; // số bài tin bỏ qua khi chuyển
                    const newsItem = yield News.find({}).sort({ createdAt: -1 }).skip(skipNewsNum).limit(pageNewsSize);
                    const sumNews = yield News.countDocuments({}); // tổng số bài tin
                    const pageSum = Math.ceil(sumNews / pageNewsSize); // tổng số page tương ứng
                    res.json({ pageSum: pageSum, data: newsItem });
                }
                else {
                    const news = yield News.find({}).sort({ createdAt: -1 });
                    res.json(news);
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    // GET danh sách tin tức theo title
    getNewsByTitle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const news = yield News.findOne({ newsTitle: req.params.newsTitle });
                res.json(news);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    // POST thêm tin tức
    addNews(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                req.body.imgNews = `${process.env.API_URL}/uploads/${req.file.filename}`;
                const newItem = new News(req.body);
                yield newItem.save();
                res.json();
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    // PATCH cập nhật tin tức
    updateNews(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.body.imgNews === '') {
                    const newsItem = News.findById(req.params._id);
                    req.body.imgNews = newsItem.imgNews;
                    yield News.updateOne({ _id: req.params._id }, req.body);
                    res.json();
                }
                else {
                    // const filter = {_id:req.params._id}
                    req.body.imgNews = `${process.env.API_URL}uploads/${req.file.filename}`;
                    yield News.updateOne({ _id: req.params._id }, req.body);
                    res.json();
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    // DELETE xóa tin tức
    deleteNews(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newItem = yield News.findById(req.params._id);
                yield fs.unlink(`./src/uploads/${newItem.imgNews.split('/').slice(-1)}`, (err) => {
                    if (err)
                        console.log(err);
                });
                yield newItem.remove();
                res.json();
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
module.exports = new NewsController;
//# sourceMappingURL=NewsController.js.map