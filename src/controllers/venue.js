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
exports.topVenues = exports.searchvenuesByCity = exports.filterVenues = exports.DeleteVenueById = exports.UpdateVenue = exports.GetVenueById = exports.Login = exports.Register = void 0;
var asynHandler_js_1 = require("../utils/asynHandler.js");
var apiError_js_1 = require("../utils/apiError.js");
var apiResponse_js_1 = require("../utils/apiResponse.js");
var cloudniary_js_1 = require("../utils/cloudniary.js");
var venue_js_1 = require("../models/venue.js");
var jsonwebtoken_1 = require("jsonwebtoken");
//Register Venu
exports.Register = (0, asynHandler_js_1.asyncHandler)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, businessName, yourName, email, password, phone, city, comments, venueType, facilities, foodPackages, venue;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, businessName = _a.businessName, yourName = _a.yourName, email = _a.email, password = _a.password, phone = _a.phone, city = _a.city, comments = _a.comments, venueType = _a.venueType, facilities = _a.facilities, foodPackages = _a.foodPackages;
                console.log(businessName, yourName, email, password, phone, city, comments);
                return [4 /*yield*/, venue_js_1.Venue.create({
                        businessName: businessName,
                        yourName: yourName,
                        email: email,
                        password: password,
                        phone: phone,
                        city: city,
                        comments: comments,
                        venueType: venueType,
                        facilities: facilities,
                        foodPackages: foodPackages
                    })];
            case 1:
                venue = _b.sent();
                if (!venue) {
                    throw new apiError_js_1.ApiError(500, "something went wrong while registering the vendor!!");
                }
                return [2 /*return*/, res.status(201).json(new apiResponse_js_1.ApiResponse(200, { venue: venue }, "vendor regiested successfully"))];
        }
    });
}); });
// Login vendor
exports.Login = (0, asynHandler_js_1.asyncHandler)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, venue, isPasswordValid, accessTokenSecret, accessToken, loggedInVenue;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                if (!email || !password) {
                    throw new apiError_js_1.ApiError(400, "Email or Password is missing!!");
                }
                return [4 /*yield*/, venue_js_1.Venue.findOne({ email: email })];
            case 1:
                venue = _b.sent();
                if (!venue) {
                    throw new apiError_js_1.ApiError(404, "Email/User doesn't exist!!");
                }
                return [4 /*yield*/, venue.isPasswordCorrect(password)];
            case 2:
                isPasswordValid = _b.sent();
                //  const  isPasswordValid = venue.password === password
                if (!isPasswordValid) {
                    throw new apiError_js_1.ApiError(401, "Invalid venue credentials");
                }
                accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'default_secret_key';
                accessToken = jsonwebtoken_1.default.sign({ id: venue._id }, accessTokenSecret, { expiresIn: '1h' });
                return [4 /*yield*/, venue_js_1.Venue.findById(venue._id).select("-password")];
            case 3:
                loggedInVenue = _b.sent();
                // Return response with logged-in vendor details and access token
                return [2 /*return*/, res.status(200)
                        .cookie("accesToken", accessToken) //put tokens in cookies
                        .json(new apiResponse_js_1.ApiResponse(200, { loggedInVenue: loggedInVenue, accessToken: accessToken }, "Here is the vendor"))];
        }
    });
}); });
//Get Venue By ID
exports.GetVenueById = (0, asynHandler_js_1.asyncHandler)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, venue;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, venue_js_1.Venue.findById(id)];
            case 1:
                venue = _a.sent();
                if (!venue) {
                    throw new apiError_js_1.ApiError(404, "No Vendor Found!!!");
                }
                return [2 /*return*/, res.status(200).json(new apiResponse_js_1.ApiResponse(200, { venue: venue }, "Here is the Vendor"))];
        }
    });
}); });
//update Venue
exports.UpdateVenue = (0, asynHandler_js_1.asyncHandler)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, updateFields, givenFiles, venue, imageUrls, _i, _a, _b, key, value;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                id = req.params.id;
                updateFields = req.body;
                console.log("data", updateFields);
                givenFiles = req.files;
                return [4 /*yield*/, venue_js_1.Venue.findById(id)];
            case 1:
                venue = _c.sent();
                if (!venue) {
                    throw new apiError_js_1.ApiError(404, "No Venue Found!!!");
                }
                if (!((givenFiles === null || givenFiles === void 0 ? void 0 : givenFiles.length) > 0)) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, cloudniary_js_1.uploadOnCloudinary)(givenFiles)];
            case 2:
                imageUrls = _c.sent();
                if (imageUrls)
                    venue.images = imageUrls;
                _c.label = 3;
            case 3:
                // Update all fields present in req.body
                for (_i = 0, _a = Object.entries(updateFields); _i < _a.length; _i++) {
                    _b = _a[_i], key = _b[0], value = _b[1];
                    if (key !== '_id' && key !== '__v') {
                        venue[key] = value;
                    }
                }
                console.log(venue);
                return [4 /*yield*/, venue.save()];
            case 4:
                _c.sent();
                return [2 /*return*/, res.status(200).json(new apiResponse_js_1.ApiResponse(200, "Venue Updated Successfully!!"))];
        }
    });
}); });
//Delete venue bY ID
exports.DeleteVenueById = (0, asynHandler_js_1.asyncHandler)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, venue, respose;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                user = req.body.user;
                console.log("useers ", user);
                return [4 /*yield*/, venue_js_1.Venue.findById(id)];
            case 1:
                venue = _a.sent();
                if (!venue) {
                    throw new apiError_js_1.ApiError(404, "No Vendor Found!!!");
                }
                return [4 /*yield*/, venue_js_1.Venue.findByIdAndDelete(id)];
            case 2:
                respose = _a.sent();
                return [2 /*return*/, res.status(200).json(new apiResponse_js_1.ApiResponse(200, { respose: respose }, "Vendor Deleted Successfully "))];
        }
    });
}); });
// Function to get all venues with optional filters
var filterVenues = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, city, minGuests, maxGuests, foodPackage, facilities, venueTypes, filterCriteria, venues, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.query, city = _a.city, minGuests = _a.minGuests, maxGuests = _a.maxGuests, foodPackage = _a.foodPackage, facilities = _a.facilities, venueTypes = _a.venueTypes;
                console.log(city, minGuests, maxGuests, foodPackage, facilities, venueTypes);
                filterCriteria = {};
                if (city) {
                    filterCriteria.city = city;
                }
                if (minGuests || maxGuests) {
                    filterCriteria.guestCapacity = {};
                    if (minGuests)
                        filterCriteria.guestCapacity.$gte = Number(minGuests);
                    if (maxGuests)
                        filterCriteria.guestCapacity.$lte = Number(maxGuests);
                }
                if (foodPackage) {
                    filterCriteria.foodPackages = foodPackage;
                }
                if (facilities) {
                    filterCriteria.facilities = { $all: facilities.split(',') };
                }
                if (venueTypes) {
                    filterCriteria.venueType = { $in: venueTypes.split(',') };
                }
                return [4 /*yield*/, venue_js_1.Venue.find(filterCriteria)];
            case 1:
                venues = _b.sent();
                // Return the filtered venues
                res.status(200).json({
                    success: true,
                    data: venues
                });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
                console.error('Error fetching venues:', error_1);
                res.status(500).json({
                    success: false,
                    message: 'An error occurred while fetching venues',
                    error: error_1.message
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.filterVenues = filterVenues;
// search by the city
var searchvenuesByCity = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var city, venues, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                city = req.params.city;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                venues = void 0;
                if (!(city && typeof city === "string")) return [3 /*break*/, 3];
                return [4 /*yield*/, venue_js_1.Venue.find({ city: city })];
            case 2:
                // Query the Vendor collection for vendors with the specified city
                venues = _a.sent();
                return [3 /*break*/, 4];
            case 3: 
            // If city parameter is not provided or is not a string, return an error
            return [2 /*return*/, res.status(400).json({ message: "City parameter is required and must be a string" })];
            case 4:
                // If no vendors are found, return an empty array
                if (!venues || venues.length === 0) {
                    return [2 /*return*/, res.status(404).json({ message: "No venues found for the specified city" })];
                }
                // If vendors are found, return them in the response
                return [2 /*return*/, res.status(200).json({ venues: venues })];
            case 5:
                error_2 = _a.sent();
                // If an error occurs during the database query, return a 500 error
                return [2 /*return*/, res.status(500).json({ message: "Internal server error" })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.searchvenuesByCity = searchvenuesByCity;
// //Get Ranked venues
// export const topVenues = asyncHandler(async (req: Request, res: Response) => {
//   // Inside this function, we assume Venue is a Mongoose model
//   const venues = await Venue.find({rank:{1:5}});
//   // Return a JSON response with a custom API response format
//   return res.status(200).json(new ApiResponse(200, { venues }, "Here are the Vendors by rank"));
// });
// Assuming Venue is a Mongoose model and asyncHandler is used for error handling
exports.topVenues = (0, asynHandler_js_1.asyncHandler)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var venues;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, venue_js_1.Venue.find({ rank: { $gte: 1, $lte: 2 } })];
            case 1:
                venues = _a.sent();
                // Return a JSON response with a custom API response format
                return [2 /*return*/, res.status(200).json(new apiResponse_js_1.ApiResponse(200, venues, "Here are the Vendors by rank"))];
        }
    });
}); });