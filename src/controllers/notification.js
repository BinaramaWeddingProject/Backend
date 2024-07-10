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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllNotificationsByVendorId = exports.getNotificationByIdStatus = exports.updateNotification = exports.getNotification = exports.postNotification = void 0;
var vendor_js_1 = require("../models/vendor.js");
var asynHandler_js_1 = require("../utils/asynHandler.js");
var user_js_1 = require("../models/user.js");
var notification_js_1 = require("../models/notification/notification.js");
var venue_js_1 = require("../models/venue.js");
exports.postNotification = (0, asynHandler_js_1.asyncHandler)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, city, flag, vendorIds, venueIds, vendors, venues, existingNotification_1, existingCities, _i, existingCities_1, existingCity, vendorsForCity, venuesForCity, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 15, , 16]);
                _a = req.body, userId = _a.userId, city = _a.city, flag = _a.flag;
                vendorIds = [];
                venueIds = [];
                if (!(flag === "vendor")) return [3 /*break*/, 2];
                return [4 /*yield*/, vendor_js_1.Vendor.find({ city: city })];
            case 1:
                vendors = _b.sent();
                if (!vendors.length) {
                    return [2 /*return*/, res.status(404).json({ error: "No vendors found" })];
                }
                vendorIds = vendors.map(function (vendor) { return vendor._id; });
                return [3 /*break*/, 5];
            case 2:
                if (!(flag === "venue")) return [3 /*break*/, 4];
                return [4 /*yield*/, venue_js_1.Venue.find({ city: city })];
            case 3:
                venues = _b.sent();
                if (!venues.length) {
                    return [2 /*return*/, res.status(404).json({ error: "No venues found" })];
                }
                venueIds = venues.map(function (venue) { return venue._id; });
                return [3 /*break*/, 5];
            case 4: return [2 /*return*/, res.status(400).json({ error: "Invalid flag value" })];
            case 5: return [4 /*yield*/, notification_js_1.default.findOne({ userId: userId })];
            case 6:
                existingNotification_1 = _b.sent();
                if (!!existingNotification_1) return [3 /*break*/, 7];
                // If notification doesn't exist, create a new one
                existingNotification_1 = new notification_js_1.default({
                    vendors: flag === "vendor" ? vendorIds.map(function (vendorId) { return ({ vendorId: vendorId, status: "unread" }); }) : [],
                    venues: flag === "venue" ? venueIds.map(function (venueId) { return ({ venueId: venueId, status: "unread" }); }) : [],
                    userId: userId,
                    city: [city],
                });
                return [3 /*break*/, 13];
            case 7:
                // Add the new city to the existing notification if it doesn't already exist
                if (!existingNotification_1.city.includes(city)) {
                    existingNotification_1.city.push(city);
                    // Add vendors or venues according to the flag and available city
                    if (flag === "vendor") {
                        vendorIds.forEach(function (vendorId) {
                            var _a;
                            if (!((_a = existingNotification_1 === null || existingNotification_1 === void 0 ? void 0 : existingNotification_1.vendors) === null || _a === void 0 ? void 0 : _a.some(function (vendor) { return vendor.vendorId === String(vendorId); }))) {
                                existingNotification_1.vendors.push({ vendorId: vendorId, status: "unread" });
                            }
                        });
                    }
                    else if (flag === "venue") {
                        venueIds.forEach(function (venueId) {
                            var _a;
                            if (!((_a = existingNotification_1 === null || existingNotification_1 === void 0 ? void 0 : existingNotification_1.venues) === null || _a === void 0 ? void 0 : _a.some(function (venue) { return String(venue.venueId) === String(venueId); }))) {
                                existingNotification_1.venues.push({ venueId: venueId, status: "unread" });
                            }
                        });
                    }
                }
                existingCities = existingNotification_1.city;
                _i = 0, existingCities_1 = existingCities;
                _b.label = 8;
            case 8:
                if (!(_i < existingCities_1.length)) return [3 /*break*/, 13];
                existingCity = existingCities_1[_i];
                if (!(flag === "vendor")) return [3 /*break*/, 10];
                return [4 /*yield*/, vendor_js_1.Vendor.find({ city: existingCity })];
            case 9:
                vendorsForCity = _b.sent();
                vendorsForCity.forEach(function (vendor) {
                    var _a;
                    if (!((_a = existingNotification_1 === null || existingNotification_1 === void 0 ? void 0 : existingNotification_1.vendors) === null || _a === void 0 ? void 0 : _a.some(function (v) { return String(v.vendorId) === String(vendor._id); }))) {
                        existingNotification_1.vendors.push({ vendorId: vendor._id, status: "unread" });
                    }
                });
                return [3 /*break*/, 12];
            case 10:
                if (!(flag === "venue")) return [3 /*break*/, 12];
                return [4 /*yield*/, venue_js_1.Venue.find({ city: existingCity })];
            case 11:
                venuesForCity = _b.sent();
                venuesForCity.forEach(function (venue) {
                    var _a;
                    if (!((_a = existingNotification_1 === null || existingNotification_1 === void 0 ? void 0 : existingNotification_1.venues) === null || _a === void 0 ? void 0 : _a.some(function (v) { return String(v.venueId) === String(venue._id); }))) {
                        existingNotification_1.venues.push({ venueId: venue._id, status: "unread" });
                    }
                });
                _b.label = 12;
            case 12:
                _i++;
                return [3 /*break*/, 8];
            case 13: return [4 /*yield*/, existingNotification_1.save()];
            case 14:
                // Save the notification to the database
                existingNotification_1 = _b.sent();
                // Send a success response
                res.status(201).json({ notification: existingNotification_1 });
                return [3 /*break*/, 16];
            case 15:
                error_1 = _b.sent();
                next(error_1);
                return [3 /*break*/, 16];
            case 16: return [2 /*return*/];
        }
    });
}); });
//get
exports.getNotification = (0, asynHandler_js_1.asyncHandler)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var vId, vendorNotifications, venueNotifications, notifications_1, users, usersWithNotification, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                vId = req.params.vId;
                console.log("vendor id", vId);
                return [4 /*yield*/, notification_js_1.default.find({
                        "vendors.vendorId": vId,
                    })];
            case 1:
                vendorNotifications = _a.sent();
                return [4 /*yield*/, notification_js_1.default.find({
                        "venues.venueId": vId,
                    })];
            case 2:
                venueNotifications = _a.sent();
                notifications_1 = __spreadArray(__spreadArray([], vendorNotifications, true), venueNotifications, true);
                return [4 /*yield*/, Promise.all(notifications_1.map(function (notification) {
                        return user_js_1.User.findById(notification.userId);
                    }))];
            case 3:
                users = _a.sent();
                usersWithNotification = users.map(function (user, index) { return ({
                    user: user,
                    notificationId: notifications_1[index]._id
                }); });
                console.log(usersWithNotification);
                // Return the array of users with their associated notification IDs
                res.json({ users: usersWithNotification });
                return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                next(error_2);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
//update
exports.updateNotification = (0, asynHandler_js_1.asyncHandler)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, vId_1, nId, notification, vendorToUpdate, venueToUpdate, updatedNotification, updatedNotification, error_3;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 8, , 9]);
                _a = req.body, vId_1 = _a.vId, nId = _a.nId;
                return [4 /*yield*/, notification_js_1.default.findById(nId)];
            case 1:
                notification = _d.sent();
                if (!!notification) return [3 /*break*/, 2];
                return [2 /*return*/, next("Notification not found")];
            case 2:
                console.log("Notification Title:", notification.status);
                vendorToUpdate = (_b = notification === null || notification === void 0 ? void 0 : notification.vendors) === null || _b === void 0 ? void 0 : _b.find(function (vendor) { return vendor.vendorId === vId_1; });
                venueToUpdate = (_c = notification === null || notification === void 0 ? void 0 : notification.venues) === null || _c === void 0 ? void 0 : _c.find(function (venue) { return venue.venueId === vId_1; });
                console.log("VendorToUpdate:", vendorToUpdate);
                if (!vendorToUpdate) return [3 /*break*/, 4];
                // Update the status of the found vendor
                vendorToUpdate.status = "read";
                return [4 /*yield*/, notification.save()];
            case 3:
                updatedNotification = _d.sent();
                console.log("updatedNotification", updatedNotification);
                res.status(200).json({
                    success: true,
                    status: updatedNotification, // Return the updated status in the response
                });
                return [3 /*break*/, 7];
            case 4:
                if (!venueToUpdate) return [3 /*break*/, 6];
                // Update the status of the found venue
                venueToUpdate.status = "read";
                return [4 /*yield*/, notification.save()];
            case 5:
                updatedNotification = _d.sent();
                console.log("updatedNotification", updatedNotification);
                res.status(200).json({
                    success: true,
                    status: updatedNotification, // Return the updated status in the response
                });
                return [3 /*break*/, 7];
            case 6: return [2 /*return*/, next("Vendor not found in the notification")];
            case 7: return [3 /*break*/, 9];
            case 8:
                error_3 = _d.sent();
                next(error_3);
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); });
exports.getNotificationByIdStatus = (0, asynHandler_js_1.asyncHandler)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var nId, vId_2, notification, status, vendor, venue, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                nId = req.params.nId;
                vId_2 = req.query.vId;
                console.log(vId_2);
                return [4 /*yield*/, notification_js_1.default.findById(nId)];
            case 1:
                notification = _a.sent();
                console.log("hello bete");
                // Check if the notification exists
                if (!notification) {
                    return [2 /*return*/, res.status(404).json({ success: false, message: 'Notification not found' })];
                }
                status = void 0;
                if (notification.vendors && notification.vendors.some(function (vendor) { return vendor.vendorId === vId_2; })) {
                    vendor = notification.vendors.find(function (vendor) { return vendor.vendorId === vId_2; });
                    status = vendor === null || vendor === void 0 ? void 0 : vendor.status;
                }
                else if (notification.venues && notification.venues.some(function (venue) { return venue.venueId === vId_2; })) {
                    venue = notification.venues.find(function (venue) { return venue.venueId === vId_2; });
                    status = venue === null || venue === void 0 ? void 0 : venue.status;
                }
                else {
                    // Vendor or Venue not found
                    return [2 /*return*/, res.status(404).json({ success: false, message: 'Vendor or Venue not found in the notification' })];
                }
                // Return the status
                res.status(200).json({ success: true, status: status });
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                next(error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.getAllNotificationsByVendorId = (0, asynHandler_js_1.asyncHandler)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var vId, vendorNotifications, venueNotifications, notifications, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                vId = req.params.vId;
                return [4 /*yield*/, notification_js_1.default.find({
                        "vendors.vendorId": vId,
                    })];
            case 1:
                vendorNotifications = _a.sent();
                return [4 /*yield*/, notification_js_1.default.find({
                        "venues.venueId": vId,
                    })];
            case 2:
                venueNotifications = _a.sent();
                notifications = __spreadArray(__spreadArray([], vendorNotifications, true), venueNotifications, true);
                // console.log("notification", vendorNotifications)
                res.status(200).json({
                    success: true,
                    status: notifications, // Return the updated status in the response
                });
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                next(error_5);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
