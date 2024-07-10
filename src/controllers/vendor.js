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
exports.GetVendorByType = exports.searchVendorsByCity = exports.ShowAllVendors = exports.DeleteVendorById = exports.GetVendorById = exports.UpdateVendor = exports.Login = exports.Register = exports.generateAccessAndRefreshTokens = void 0;
var vendor_js_1 = require("../models/vendor.js");
var asynHandler_js_1 = require("../utils/asynHandler.js");
var apiError_js_1 = require("../utils/apiError.js");
var apiResponse_js_1 = require("../utils/apiResponse.js");
var cloudniary_js_1 = require("../utils/cloudniary.js");
var jsonwebtoken_1 = require("jsonwebtoken");
var generateAccessAndRefreshTokens = function (vendorId) { return __awaiter(void 0, void 0, Promise, function () {
    var vendor, accessToken, refreshToken, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, vendor_js_1.Vendor.findById(vendorId)];
            case 1:
                vendor = _a.sent();
                if (!vendor) {
                    throw new Error("Vendor not found");
                }
                accessToken = vendor.generateAccessToken();
                refreshToken = vendor.generateRefreshToken();
                // Attach refresh token to the vendor document
                vendor.refreshToken = refreshToken;
                // Save the vendor with validateBeforeSave set to false
                return [4 /*yield*/, vendor.save({ validateBeforeSave: false })];
            case 2:
                // Save the vendor with validateBeforeSave set to false
                _a.sent();
                return [2 /*return*/, { accessToken: accessToken, refreshToken: refreshToken }];
            case 3:
                error_1 = _a.sent();
                throw new Error("Something went wrong while generating the access token");
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.generateAccessAndRefreshTokens = generateAccessAndRefreshTokens;
//Register vendor 
exports.Register = (0, asynHandler_js_1.asyncHandler)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, password, phone, city, type_Of_Business, businessName, vendor;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, email = _a.email, password = _a.password, phone = _a.phone, city = _a.city, type_Of_Business = _a.type_Of_Business, businessName = _a.businessName;
                return [4 /*yield*/, vendor_js_1.Vendor.create({
                        name: name,
                        email: email,
                        password: password,
                        phone: phone,
                        city: city,
                        type_Of_Business: type_Of_Business,
                        businessName: businessName
                    })];
            case 1:
                vendor = _b.sent();
                if (!vendor) {
                    throw new apiError_js_1.ApiError(500, "something went wrong while registering the vendor!!");
                }
                return [2 /*return*/, res.status(201).json(new apiResponse_js_1.ApiResponse(200, { vendor: vendor }, "vendor regiested successfully"))];
        }
    });
}); });
// Login vendor
exports.Login = (0, asynHandler_js_1.asyncHandler)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, vendor, isPasswordValid, accessTokenSecret, accessToken, loggedInVendor;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                if (!email || !password) {
                    throw new apiError_js_1.ApiError(400, "Email or Password is missing!!");
                }
                return [4 /*yield*/, vendor_js_1.Vendor.findOne({ email: email })];
            case 1:
                vendor = _b.sent();
                if (!vendor) {
                    throw new apiError_js_1.ApiError(404, "Email/Vendor doesn't exist!!");
                }
                return [4 /*yield*/, vendor.isPasswordCorrect(password)];
            case 2:
                isPasswordValid = _b.sent();
                //  const  isPasswordValid = vendor.password === password
                if (!isPasswordValid) {
                    throw new apiError_js_1.ApiError(401, "Invalid vendor credentials");
                }
                accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'default_secret_key';
                accessToken = jsonwebtoken_1.default.sign({ id: vendor._id }, accessTokenSecret, { expiresIn: '1h' });
                return [4 /*yield*/, vendor_js_1.Vendor.findById(vendor._id).select("-password")];
            case 3:
                loggedInVendor = _b.sent();
                // Return response with logged-in vendor details and access token
                return [2 /*return*/, res.status(200)
                        .cookie('authToken', accessToken, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production', // Set to true in production
                        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
                        // sameSite: 'Lax', // Consider setting this based on your requirements
                    })
                        .json(new apiResponse_js_1.ApiResponse(200, { loggedInVendor: loggedInVendor, accessToken: accessToken }, "Here is the vendor"))];
        }
    });
}); });
//update details of the vendor...
exports.UpdateVendor = (0, asynHandler_js_1.asyncHandler)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, updateFields, givenFiles, vendor, imageUrls, _i, _a, _b, key, value;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                id = req.params.id;
                updateFields = req.body;
                givenFiles = req.files;
                console.log("uodate", updateFields);
                return [4 /*yield*/, vendor_js_1.Vendor.findById(id)];
            case 1:
                vendor = _c.sent();
                if (!vendor) {
                    throw new apiError_js_1.ApiError(404, "No Vendor Found!!!");
                }
                if (!((givenFiles === null || givenFiles === void 0 ? void 0 : givenFiles.length) > 0)) return [3 /*break*/, 3];
                console.log(givenFiles);
                return [4 /*yield*/, (0, cloudniary_js_1.uploadOnCloudinary)(givenFiles)];
            case 2:
                imageUrls = _c.sent();
                console.log("cloud", imageUrls);
                if (imageUrls)
                    vendor.portfolio = imageUrls;
                _c.label = 3;
            case 3:
                // Update all fields present in req.body
                for (_i = 0, _a = Object.entries(updateFields); _i < _a.length; _i++) {
                    _b = _a[_i], key = _b[0], value = _b[1];
                    if (value == undefined)
                        continue;
                    if (key !== '_id' && key !== '__v' && value != undefined) {
                        vendor[key] = value;
                    }
                }
                return [4 /*yield*/, vendor.save()];
            case 4:
                _c.sent();
                return [2 /*return*/, res.status(200).json(new apiResponse_js_1.ApiResponse(200, "Vendor Updated Successfully!!"))];
        }
    });
}); });
//Get Vendor By ID
exports.GetVendorById = (0, asynHandler_js_1.asyncHandler)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, vendor;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, vendor_js_1.Vendor.findById(id)];
            case 1:
                vendor = _a.sent();
                if (!vendor) {
                    throw new apiError_js_1.ApiError(404, "No Vendor Found!!!");
                }
                return [2 /*return*/, res.status(200).json(new apiResponse_js_1.ApiResponse(200, { vendor: vendor }, "Here is the Vendor"))];
        }
    });
}); });
//Delete Vendor bY ID
exports.DeleteVendorById = (0, asynHandler_js_1.asyncHandler)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, vendor, respose;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, vendor_js_1.Vendor.findById(id)];
            case 1:
                vendor = _a.sent();
                if (!vendor) {
                    throw new apiError_js_1.ApiError(404, "No Vendor Found!!!");
                }
                return [4 /*yield*/, vendor_js_1.Vendor.findByIdAndDelete(id)];
            case 2:
                respose = _a.sent();
                return [2 /*return*/, res.status(200).json(new apiResponse_js_1.ApiResponse(200, { respose: respose }, "Vendor Deleted Successfully "))];
        }
    });
}); });
//getall vendors
exports.ShowAllVendors = (0, asynHandler_js_1.asyncHandler)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var vendors;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, vendor_js_1.Vendor.find()];
            case 1:
                vendors = _a.sent();
                if (!vendors || vendors.length === 0) {
                    throw new apiError_js_1.ApiError(404, "No vendors in DB");
                }
                return [2 /*return*/, res.status(200).json(new apiResponse_js_1.ApiResponse(200, { vendors: vendors }, "here are all vendors."))];
        }
    });
}); });
// search by the city
var searchVendorsByCity = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var city, vendors, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                city = req.params.city;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                vendors = void 0;
                if (!(city && typeof city === "string")) return [3 /*break*/, 3];
                return [4 /*yield*/, vendor_js_1.Vendor.find({ city: city })];
            case 2:
                // Query the Vendor collection for vendors with the specified city
                vendors = _a.sent();
                return [3 /*break*/, 4];
            case 3: 
            // If city parameter is not provided or is not a string, return an error
            return [2 /*return*/, res.status(400).json({ message: "City parameter is required and must be a string" })];
            case 4:
                // If no vendors are found, return an empty array
                if (!vendors || vendors.length === 0) {
                    return [2 /*return*/, res.status(404).json({ message: "No vendors found for the specified city" })];
                }
                // If vendors are found, return them in the response
                return [2 /*return*/, res.status(200).json({ vendors: vendors })];
            case 5:
                error_2 = _a.sent();
                // If an error occurs during the database query, return a 500 error
                return [2 /*return*/, res.status(500).json({ message: "Internal server error" })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.searchVendorsByCity = searchVendorsByCity;
//
//Get vendor type
exports.GetVendorByType = (0, asynHandler_js_1.asyncHandler)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var type, vendors;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("pass1");
                type = req.params.type_Of_Business;
                console.log(req.params);
                console.log("pass2", type);
                return [4 /*yield*/, vendor_js_1.Vendor.find({ type_Of_Business: type })];
            case 1:
                vendors = _a.sent();
                console.log("pass3", vendors);
                // Check if vendors were found
                if (!vendors || vendors.length === 0) {
                    // Handle case where no vendors were found for the given type
                    throw new apiError_js_1.ApiError(404, "No Vendors Found!!!");
                }
                // Return the found vendors
                return [2 /*return*/, res.status(200).json(new apiResponse_js_1.ApiResponse(200, { vendors: vendors }, "Here are the Vendors by type"))];
        }
    });
}); });
//top rankers
// export const topVendors = asyncHandler(async (req: Request, res: Response) => {
//   const vendors = await Vendor.find();
//   return res.status(200).json(new ApiResponse(200, { vendors }, "Here are the Vendors by rank"));
// });
