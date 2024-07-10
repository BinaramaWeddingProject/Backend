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
exports.GetAllCities = exports.UpdateUser = exports.ShowAllUsers = exports.DeleteUserById = exports.GetUserById = exports.Login = exports.Register = void 0;
var asynHandler_js_1 = require("../utils/asynHandler.js");
var apiError_js_1 = require("../utils/apiError.js");
var apiResponse_js_1 = require("../utils/apiResponse.js");
var user_js_1 = require("../models/user.js");
var jsonwebtoken_1 = require("jsonwebtoken");
var vendor_js_1 = require("../models/vendor.js");
var cloudniary_js_1 = require("../utils/cloudniary.js");
var venue_js_1 = require("../models/venue.js");
//Register vendor 
exports.Register = (0, asynHandler_js_1.asyncHandler)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, fullName, email, password, phone, city, user;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, fullName = _a.fullName, email = _a.email, password = _a.password, phone = _a.phone, city = _a.city;
                return [4 /*yield*/, user_js_1.User.create({
                        fullName: fullName,
                        email: email,
                        password: password,
                        phone: phone,
                        city: city,
                    })];
            case 1:
                user = _b.sent();
                if (!user) {
                    throw new apiError_js_1.ApiError(500, "something went wrong while registering the user!!");
                }
                return [2 /*return*/, res.status(201).json(new apiResponse_js_1.ApiResponse(200, { user: user }, "user regiested successfully"))];
        }
    });
}); });
// Login vendor
exports.Login = (0, asynHandler_js_1.asyncHandler)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, isPasswordValid, accessTokenSecret, accessToken, loggedInUser;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                if (!email || !password) {
                    throw new apiError_js_1.ApiError(400, "Email or Password is missing!!");
                }
                return [4 /*yield*/, user_js_1.User.findOne({ email: email })];
            case 1:
                user = _b.sent();
                if (!user) {
                    throw new apiError_js_1.ApiError(404, "Email/User doesn't exist!!");
                }
                return [4 /*yield*/, user.isPasswordCorrect(password)];
            case 2:
                isPasswordValid = _b.sent();
                // const  isPasswordValid = user.password === password
                if (!isPasswordValid) {
                    throw new apiError_js_1.ApiError(401, "Invalid user credentials");
                }
                accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'default_secret_key';
                accessToken = jsonwebtoken_1.default.sign({ id: user._id }, accessTokenSecret, { expiresIn: '1h' });
                return [4 /*yield*/, user_js_1.User.findById(user._id).select("-password")];
            case 3:
                loggedInUser = _b.sent();
                // Return response with logged-in vendor details and access token
                return [2 /*return*/, res.status(200)
                        .cookie("accesToken", accessToken) //put tokens in cookies
                        .json(new apiResponse_js_1.ApiResponse(200, { loggedInUser: loggedInUser, accessToken: accessToken }, "Here is the vendor"))];
        }
    });
}); });
//Get user By ID
exports.GetUserById = (0, asynHandler_js_1.asyncHandler)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, user_js_1.User.findById(id)];
            case 1:
                user = _a.sent();
                if (!user) {
                    throw new apiError_js_1.ApiError(404, "No user Found!!!");
                }
                return [2 /*return*/, res.status(200).json(new apiResponse_js_1.ApiResponse(200, { user: user }, "Here is the user"))];
        }
    });
}); });
//Delete User bY ID
exports.DeleteUserById = (0, asynHandler_js_1.asyncHandler)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, respose;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                console.log("user id", id);
                return [4 /*yield*/, user_js_1.User.findById(id)];
            case 1:
                user = _a.sent();
                if (!user) {
                    throw new apiError_js_1.ApiError(404, "No user Found!!!");
                }
                return [4 /*yield*/, user_js_1.User.findByIdAndDelete(id)];
            case 2:
                respose = _a.sent();
                return [2 /*return*/, res.status(200).json(new apiResponse_js_1.ApiResponse(200, { respose: respose }, "User Deleted Successfully "))];
        }
    });
}); });
//getall users
exports.ShowAllUsers = (0, asynHandler_js_1.asyncHandler)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_js_1.User.find()];
            case 1:
                users = _a.sent();
                if (!users || users.length === 0) {
                    throw new apiError_js_1.ApiError(404, "No users in DB");
                }
                return [2 /*return*/, res.status(200).json(new apiResponse_js_1.ApiResponse(200, { users: users }, "here are all vendors."))];
        }
    });
}); });
//update details of the user...
exports.UpdateUser = (0, asynHandler_js_1.asyncHandler)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, updateFields, givenFiles, user, imageUrls, _i, _a, _b, key, value;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                id = req.params.id;
                updateFields = req.body;
                givenFiles = req.files;
                return [4 /*yield*/, user_js_1.User.findById(id)];
            case 1:
                user = _c.sent();
                if (!user) {
                    throw new apiError_js_1.ApiError(404, "No User Found!!!");
                }
                if (!((givenFiles === null || givenFiles === void 0 ? void 0 : givenFiles.length) > 0)) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, cloudniary_js_1.uploadOnCloudinary)(givenFiles)];
            case 2:
                imageUrls = _c.sent();
                if (imageUrls)
                    user.avatar = imageUrls[0];
                _c.label = 3;
            case 3:
                // Update all fields present in req.body
                for (_i = 0, _a = Object.entries(updateFields); _i < _a.length; _i++) {
                    _b = _a[_i], key = _b[0], value = _b[1];
                    if (value == undefined)
                        continue;
                    if (key !== '_id' && key !== '__v' && value != undefined) {
                        user[key] = value;
                    }
                }
                return [4 /*yield*/, user.save()];
            case 4:
                _c.sent();
                return [2 /*return*/, res.status(200).json(new apiResponse_js_1.ApiResponse(200, "User Updated Successfully!!"))];
        }
    });
}); });
//all cities
// all cities
exports.GetAllCities = (0, asynHandler_js_1.asyncHandler)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var p, c, cities, capitalizedCities;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, vendor_js_1.Vendor.find()];
            case 1:
                p = _a.sent();
                return [4 /*yield*/, venue_js_1.Venue.find()];
            case 2:
                c = _a.sent();
                cities = __spreadArray([], new Set(__spreadArray(__spreadArray([], p.map(function (v) { return v.city.toLowerCase(); }), true), c.map(function (v) { return v.city.toLowerCase(); }), true)), true);
                capitalizedCities = cities.map(function (city) { return city.charAt(0).toUpperCase() + city.slice(1); });
                return [2 /*return*/, res.status(200).json({ cities: capitalizedCities })];
        }
    });
}); });
