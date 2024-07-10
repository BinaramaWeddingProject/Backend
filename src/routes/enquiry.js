"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var enquiry_js_1 = require("../controllers/enquiry.js");
var router = (0, express_1.Router)();
router.route("/submit").post(enquiry_js_1.submitEnquiryForm);
router.get('/all/enquiry', enquiry_js_1.allEnquiries);
router.patch('/:id', enquiry_js_1.updateReadStatus);
exports.default = router;
