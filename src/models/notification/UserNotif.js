"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var UserNotificationSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, required: true, default: "unread" },
    userId: { type: String, required: true },
    vendorId: { type: String },
    venueId: { type: String }
});
var UserNotificationModel = mongoose_1.default.model('UserNotification', UserNotificationSchema);
exports.default = UserNotificationModel;
