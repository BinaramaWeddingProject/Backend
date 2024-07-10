"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var vendor_js_1 = require("../controllers/vendor.js");
var multer_js_1 = require("../middlewares/multer.js");
var router = (0, express_1.Router)();
//post
router.route("/register").post(vendor_js_1.Register);
router.route("/login").post(vendor_js_1.Login);
//put
router.route("/:id").put(multer_js_1.upload.array('portfolio', 20), vendor_js_1.UpdateVendor);
//get
router.route("/all").get(vendor_js_1.ShowAllVendors);
// GET - Retrieve a vendor by ID
router.get("/:id", vendor_js_1.GetVendorById);
// GET - Search vendors by city
router.get(":city", vendor_js_1.searchVendorsByCity);
//delete
router.route("/:id").delete(vendor_js_1.DeleteVendorById);
//Get -  vendors by type
router.get("/category/:type_Of_Business", vendor_js_1.GetVendorByType);
//Get-ranked vendors
// router.get("/rankedvendors")
exports.default = router;
