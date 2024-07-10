"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminNotificationModel = void 0;
var mongoose_1 = require("mongoose");
var AdminNotificationSchema = new mongoose_1.Schema({
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
exports.AdminNotificationModel = mongoose_1.default.model("AdminNotification", AdminNotificationSchema);
exports.default = exports.AdminNotificationModel;
