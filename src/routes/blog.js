"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var blog_js_1 = require("../controllers/blog.js");
var multer_js_1 = require("../middlewares/multer.js");
var router = (0, express_1.Router)();
//post
router.route("/add").post(multer_js_1.upload.array('image', 3), blog_js_1.addItemToBloglist);
//get
router.route("/:id").get(blog_js_1.GetBlogById);
//Delete
router.route("/:id").delete(blog_js_1.DeleteblogById);
//update
router.route("/:id").patch(multer_js_1.upload.array('image', 3), blog_js_1.UpdateBlog);
//getAll
router.route("/all/blog").get(blog_js_1.getAllBlogs);
exports.default = router;
