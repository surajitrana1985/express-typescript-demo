"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Post_1 = require("../models/Post");
class PostRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    GetPosts(req, res) {
        Post_1.default.find({})
            .then((data) => {
            const status = res.statusCode;
            res.status(200).json({
                status,
                data
            });
        })
            .catch((err) => {
            const status = res.statusCode;
            res.json({
                status,
                err
            });
        });
    }
    GetPost(req, res) {
        const slug = req.params.slug;
        Post_1.default.findOne({ slug })
            .then((data) => {
            const status = res.statusCode;
            res.status(200).json({
                status,
                data
            });
        })
            .catch((err) => {
            const status = res.statusCode;
            res.json({
                status,
                err
            });
        });
    }
    CreatePost(req, res) {
        const title = req.body.title;
        const slug = req.body.slug;
        const content = req.body.content;
        const featuredImage = req.body.featuredImage;
        const post = new Post_1.default({
            title,
            slug,
            content,
            featuredImage
        });
        post.save()
            .then((data) => {
            const status = res.statusCode;
            res.status(200).json({
                status,
                data
            });
        })
            .catch((err) => {
            const status = res.statusCode;
            res.json({
                status,
                err
            });
        });
    }
    UpdatePost(req, res) {
        const slug = req.params.slug;
        Post_1.default.findOneAndUpdate({ slug }, req.body)
            .then((data) => {
            const status = res.statusCode;
            res.status(200).json({
                status,
                data
            });
        })
            .catch((err) => {
            const status = res.statusCode;
            res.json({
                status,
                err
            });
        });
    }
    DeletePost(req, res) {
        const slug = req.params.slug;
        Post_1.default.findOneAndRemove({ slug })
            .then((data) => {
            const status = res.statusCode;
            res.status(200).json({
                status,
                data
            });
        })
            .catch((err) => {
            const status = res.statusCode;
            res.json({
                status,
                err
            });
        });
    }
    routes() {
        this.router.get('/', this.GetPosts);
        this.router.get('/:slug', this.GetPost);
        this.router.post('/', this.CreatePost);
        this.router.put('/:slug', this.UpdatePost);
        this.router.delete('/:slug', this.DeletePost);
    }
}
const postRoutes = new PostRouter();
postRoutes.routes();
exports.default = postRoutes.router;
//# sourceMappingURL=PostRouter.js.map