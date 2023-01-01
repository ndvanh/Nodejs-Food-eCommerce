"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded());
app.use(express.json());
const port = process.env.PORT || 8080;
const cors = require("cors");
app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH']
}));
// Routes init
const route = require("./routes/index");
route(app);
// Kết nối mongodb
const db = require("./config/db/index");
db.connect();
app.get('/', (req, res) => {
    res.json('API Cloud Food!');
});
app.use(express.static('src'));
app.use('uploads', express.static('uploads'));
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=index.js.map