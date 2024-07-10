"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Enquiry = void 0;
var mongoose_1 = require("mongoose");
var enquirySchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    guests: {
        type: String,
    },
    date: {
        type: String,
    },
    address: {
        type: String,
    },
    message: {
        type: String,
    },
    typeOfEvent: {
        type: String,
    },
    isRead: {
        type: Boolean,
        default: false
    },
});
exports.Enquiry = mongoose_1.default.model("Enquiry", enquirySchema);
