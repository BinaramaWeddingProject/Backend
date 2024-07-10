"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routes.js
var express_1 = require("express");
var multer_js_1 = require("../middlewares/multer.js");
var realweddings_js_1 = require("../controllers/realweddings.js");
var router = (0, express_1.Router)();
//post
router.route("/add").post(multer_js_1.upload.array('images', 4), realweddings_js_1.addItemToRealWeddingsPost);
//get
router.route("/:id").get(realweddings_js_1.GetRealWeddingsPostById);
//Delete
router.route("/:id").delete(realweddings_js_1.DeleteRealWeddingsById);
//update
router.route("/:id").patch(multer_js_1.upload.array('images', 4), realweddings_js_1.UpdateRealWeddingsPost);
//getAll
router.route("/all/realweddings").get(realweddings_js_1.getAllRealWeddings);
exports.default = router;
