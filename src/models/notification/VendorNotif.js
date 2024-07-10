"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorNotificationModel = void 0;
var mongoose_1 = require("mongoose");
var VendorNotificationSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: "unread"
    },
    userId: {
        type: String,
        required: true
    },
    vendorId: {
        type: String,
        required: true
    },
}, { timestamps: true });
exports.VendorNotificationModel = mongoose_1.default.model("VendorNotification", VendorNotificationSchema);
exports.default = exports.VendorNotificationModel;
