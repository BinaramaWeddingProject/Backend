"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenueNotificationModel = void 0;
var mongoose_1 = require("mongoose");
var VenueNotificationSchema = new mongoose_1.Schema({
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
    venueId: {
        type: String,
        required: true
    },
}, { timestamps: true });
exports.VenueNotificationModel = mongoose_1.default.model("VenueNotification", VenueNotificationSchema);
exports.default = exports.VenueNotificationModel;
