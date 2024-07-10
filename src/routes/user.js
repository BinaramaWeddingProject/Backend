"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_js_1 = require("../controllers/user.js");
var multer_js_1 = require("../middlewares/multer.js");
var router = (0, express_1.Router)();
//post
router.route("/register").post(user_js_1.Register);
router.route("/login").post(user_js_1.Login);
//get
router.route("/all").get(user_js_1.ShowAllUsers);
//put
router.route("/:id").put(multer_js_1.upload.array('avatar', 1), user_js_1.UpdateUser);
//router.route("/:id").put(upload.array('image' , 3),UpdateVendor);
// GET - Retrieve a user by ID
router.get("/:id", user_js_1.GetUserById);
//delete
router.route("/:id").delete(user_js_1.DeleteUserById);
//get cities
router.route("/all/city").get(user_js_1.GetAllCities);
exports.default = router;
