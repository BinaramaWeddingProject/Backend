"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBooking = exports.updateBookingVerification = exports.getBookingEnquiryStatus = exports.getBookingById = exports.getAllBookings = exports.createBooking = void 0;
var booking_js_1 = require("../models/booking/booking.js");
var createBooking = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, vId, uId, name, contact, location, guests, date, address, message, typeOfEvent, existingBooking, uniqueId, newBooking, savedBooking, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, vId = _a.vId, uId = _a.uId, name = _a.name, contact = _a.contact, location = _a.location, guests = _a.guests, date = _a.date, address = _a.address, message = _a.message, typeOfEvent = _a.typeOfEvent;
                return [4 /*yield*/, booking_js_1.Booking.findOne({ uId: uId, vId: vId })];
            case 1:
                existingBooking = _b.sent();
                if (existingBooking) {
                    return [2 /*return*/, res.status(400).json({ error: 'Booking already exists for this uId and vId' })];
                }
                uniqueId = Math.floor(100000 + Math.random() * 900000);
                newBooking = new booking_js_1.Booking({
                    vId: vId,
                    uId: uId,
                    name: name,
                    contact: contact,
                    location: location,
                    guests: guests,
                    date: date,
                    address: address,
                    message: message,
                    typeOfEvent: typeOfEvent, // New field added
                    bookingId: uniqueId
                });
                return [4 /*yield*/, newBooking.save()];
            case 2:
                savedBooking = _b.sent();
                return [2 /*return*/, res.status(201).json({ message: "True", bookingId: savedBooking.bookingId })];
            case 3:
                error_1 = _b.sent();
                return [2 /*return*/, res.status(500).json({ error: error_1.message })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createBooking = createBooking;
// Get all bookings
var getAllBookings = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var bookings, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, booking_js_1.Booking.find()];
            case 1:
                bookings = _a.sent();
                return [2 /*return*/, res.status(200).json(bookings)];
            case 2:
                error_2 = _a.sent();
                return [2 /*return*/, res.status(500).json({ error: error_2.message })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllBookings = getAllBookings;
var getBookingById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var vId, booking, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                vId = req.params.vId;
                return [4 /*yield*/, booking_js_1.Booking.find({ vId: vId })];
            case 1:
                booking = _a.sent();
                if (!booking) {
                    return [2 /*return*/, res.status(404).json({ message: 'Booking not found' })];
                }
                return [2 /*return*/, res.status(200).json(booking)];
            case 2:
                error_3 = _a.sent();
                return [2 /*return*/, res.status(500).json({ error: error_3.message })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getBookingById = getBookingById;
//sent enquiry status check
var getBookingEnquiryStatus = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var vId, uId, booking, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                vId = req.params.vId;
                uId = req.query.uId;
                if (!vId || !uId) {
                    return [2 /*return*/, res.status(400).json({ message: 'vId and uId are required' })];
                }
                return [4 /*yield*/, booking_js_1.Booking.findOne({ vId: vId, uId: uId })];
            case 1:
                booking = _a.sent();
                if (!booking) {
                    return [2 /*return*/, res.status(404).json({ message: 'Booking not found' })];
                }
                return [2 /*return*/, res.status(200).json({ message: "True", bookingId: booking.bookingId })];
            case 2:
                error_4 = _a.sent();
                return [2 /*return*/, res.status(500).json({ error: error_4.message })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getBookingEnquiryStatus = getBookingEnquiryStatus;
// Update a booking by ID
var updateBookingVerification = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var vId, _a, uId, bookingId, booking, updateBooking, updateBooking, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 7, , 8]);
                vId = req.params.vId;
                _a = req.body, uId = _a.uId, bookingId = _a.bookingId;
                console.log("pathc req log", vId, uId, bookingId);
                return [4 /*yield*/, booking_js_1.Booking.findOne({ vId: vId, uId: uId })];
            case 1:
                booking = _b.sent();
                console.log("dataa", booking);
                if (!booking) {
                    return [2 /*return*/, res.status(404).json({ message: 'Booking not found for this venueId' })];
                }
                if (!(booking.bookingId == bookingId)) return [3 /*break*/, 3];
                console.log("book", booking.bookingId);
                booking.isVerified = "Approved";
                console.log("status kya h", booking);
                return [4 /*yield*/, booking.save()];
            case 2:
                updateBooking = _b.sent();
                console.log("aap", updateBooking);
                return [2 /*return*/, res.status(200).json(updateBooking.isVerified)];
            case 3:
                if (!(bookingId == "Rejected")) return [3 /*break*/, 5];
                console.log("rejected", bookingId);
                booking.isVerified = "Rejected";
                return [4 /*yield*/, booking.save()];
            case 4:
                updateBooking = _b.sent();
                return [2 /*return*/, res.status(500).json(updateBooking.isVerified)];
            case 5:
                if (booking.bookingId != bookingId) {
                    return [2 /*return*/, res.status(500).json("Code not valid")];
                }
                else {
                    booking.isVerified = "Pending";
                    return [2 /*return*/, res.status(500).json("Request still in Pending State")];
                }
                _b.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                error_5 = _b.sent();
                return [2 /*return*/, res.status(500).json({ error: error_5.message })];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.updateBookingVerification = updateBookingVerification;
// Delete a booking by ID
var deleteBooking = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var deletedBooking, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, booking_js_1.Booking.findByIdAndDelete(req.params.id)];
            case 1:
                deletedBooking = _a.sent();
                if (!deletedBooking) {
                    return [2 /*return*/, res.status(404).json({ message: 'Booking not found' })];
                }
                return [2 /*return*/, res.status(200).json({ message: 'Booking deleted successfully' })];
            case 2:
                error_6 = _a.sent();
                return [2 /*return*/, res.status(500).json({ error: error_6.message })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteBooking = deleteBooking;
