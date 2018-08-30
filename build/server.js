"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const compression = require("compression");
const logger = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
// import routers
const PostRouter_1 = require("./routers/PostRouter");
const UserRouter_1 = require("./routers/UserRouter");
class Server {
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }
    config() {
        // mongoose connection
        const MONGO_URI = 'mongodb://localhost:27017/tes';
        mongoose.connect(MONGO_URI || process.env.MONGO_URI);
        // configuration
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(logger('dev'));
        this.app.use(compression());
        this.app.use(helmet());
        this.app.use(cors());
    }
    routes() {
        let router;
        router = express.Router();
        this.app.use('/', router);
        this.app.use('/api/v1/posts', PostRouter_1.default);
        this.app.use('/api/v1/users', UserRouter_1.default);
    }
}
exports.default = new Server().app;
//# sourceMappingURL=server.js.map