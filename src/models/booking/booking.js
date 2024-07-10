"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
var mongoose_1 = require("mongoose");
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
// Define the Booking Schema
var BookingSchema = new mongoose_1.Schema({
    vId: { type: String, required: true },
    uId: { type: String, required: true },
    name: { type: String, required: true },
    contact: { type: Number, required: true },
    location: { type: String, required: true },
    guests: { type: String, required: true },
    date: { type: Date, required: true },
    address: { type: String, required: true },
    message: { type: String, required: true },
    typeOfEvent: { type: String },
    bookingId: { type: String, required: true },
    isVerified: { type: String, enum: ['Approved', 'Rejected', 'Pending'], default: 'Pending' },
    status: { type: String, enum: ['Read', 'Unread'], default: 'Unread' }
}, {
    timestamps: true // Add timestamps to record creation and update times
});
// Create and export the Booking model
exports.Booking = mongoose_1.default.model("Booking", BookingSchema);
