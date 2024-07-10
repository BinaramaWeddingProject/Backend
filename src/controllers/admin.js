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
exports.deleteBookingById = exports.deleteUserById = exports.getAllUsers = exports.deleteVenueById = exports.getAllVenues = exports.deleteVendorById = exports.getAllVendors = exports.deleteAdminById = exports.updateAdminProfile = exports.getAdminById = exports.getAllAdmins = exports.loginAdmin = exports.createAdmin = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var admin_model_js_1 = require("../models/admin/admin.model.js");
var asynHandler_js_1 = require("../utils/asynHandler.js");
var vendor_js_1 = require("../models/vendor.js");
var venue_js_1 = require("../models/venue.js");
var user_js_1 = require("../models/user.js");
var apiError_js_1 = require("../utils/apiError.js");
var apiResponse_js_1 = require("../utils/apiResponse.js");
var cloudniary_js_1 = require("../utils/cloudniary.js");
// Function to create a new admin
var createAdmin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newAdmin, savedAdmin, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                newAdmin = new admin_model_js_1.default(req.body);
                console.log("data", req.body);
                return [4 /*yield*/, newAdmin.save()];
            case 1:
                savedAdmin = _a.sent();
                res.status(201).json(savedAdmin);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(500).json({ message: error_1.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createAdmin = createAdmin;
//to login
exports.loginAdmin = (0, asynHandler_js_1.asyncHandler)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, admin, isPasswordValid, accessTokenSecret, accessToken, loggedInAdmin;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                if (!email || !password) {
                    throw new apiError_js_1.ApiError(400, "Email or Password is missing!!");
                }
                return [4 /*yield*/, admin_model_js_1.default.findOne({ 'profile.email': email })];
            case 1:
                admin = _b.sent();
                if (!admin) {
                    throw new apiError_js_1.ApiError(404, "Email/admin doesn't exist!!");
                }
                return [4 /*yield*/, admin.profile.isPasswordCorrect(password)];
            case 2:
                isPasswordValid = _b.sent();
                console.log(isPasswordValid);
                if (!isPasswordValid) {
                    throw new apiError_js_1.ApiError(401, "Invalid admin credentials");
                }
                accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'default_secret_key';
                accessToken = jsonwebtoken_1.default.sign({ id: admin._id }, accessTokenSecret, { expiresIn: '1h' });
                return [4 /*yield*/, admin_model_js_1.default.findById(admin._id).select("-password")];
            case 3:
                loggedInAdmin = _b.sent();
                // Return response with logged-in vendor details and access token
                return [2 /*return*/, res.status(200)
                        .cookie("accessToken", accessToken, {
                        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
                        secure: process.env.NODE_ENV === 'production', // Ensures the cookie is sent only over HTTPS in production
                        sameSite: 'strict', // Ensures the cookie is sent only to the same site
                        maxAge: 3600000 // 1 hour in milliseconds
                    })
                        .json(new apiResponse_js_1.ApiResponse(200, { loggedInAdmin: loggedInAdmin, accessToken: accessToken }, "Here is the admin"))];
        }
    });
}); });
// Function to get all admins
var getAllAdmins = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var admins, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, admin_model_js_1.default.find()];
            case 1:
                admins = _a.sent();
                res.status(200).json(admins);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(500).json({ message: error_2.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllAdmins = getAllAdmins;
// Function to get admin by ID
var getAdminById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var admin, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, admin_model_js_1.default.findById(req.params.id)];
            case 1:
                admin = _a.sent();
                if (admin) {
                    res.status(200).json(admin);
                }
                else {
                    res.status(404).json({ message: 'Admin not found' });
                }
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                res.status(500).json({ message: error_3.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAdminById = getAdminById;
// Function to update admin by ID
var updateAdminProfile = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, givenFiles, admin, imageUrls, imageUrls, _a, name, email, password, contact, address, city, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 7, , 8]);
                id = req.params.id;
                givenFiles = req.files;
                return [4 /*yield*/, admin_model_js_1.default.findById(id)];
            case 1:
                admin = _b.sent();
                // If admin not found, return 404 Not Found
                if (!admin) {
                    return [2 /*return*/, res.status(404).json({ message: "Admin not found" })];
                }
                if (!((givenFiles === null || givenFiles === void 0 ? void 0 : givenFiles.length) > 0)) return [3 /*break*/, 3];
                console.log(givenFiles);
                return [4 /*yield*/, (0, cloudniary_js_1.uploadOnCloudinary)(givenFiles)];
            case 2:
                imageUrls = _b.sent();
                console.log("cloud", imageUrls);
                if (imageUrls)
                    admin.profile.avatar = imageUrls[0];
                _b.label = 3;
            case 3:
                if (!((givenFiles === null || givenFiles === void 0 ? void 0 : givenFiles.length) > 0)) return [3 /*break*/, 5];
                console.log(givenFiles);
                return [4 /*yield*/, (0, cloudniary_js_1.uploadOnCloudinary)(givenFiles)];
            case 4:
                imageUrls = _b.sent();
                console.log("cloud", imageUrls);
                if (imageUrls)
                    admin.profile.avatar = imageUrls[0];
                _b.label = 5;
            case 5:
                _a = req.body, name = _a.name, email = _a.email, password = _a.password, contact = _a.contact, address = _a.address, city = _a.city;
                // If provided, update profile fields
                if (name)
                    admin.profile.name = name;
                if (email)
                    admin.profile.email = email;
                if (password)
                    admin.profile.password = password;
                if (contact)
                    admin.profile.contact = contact;
                if (address)
                    admin.profile.address = address;
                if (city)
                    admin.profile.city = city;
                // Save the updated admin document
                return [4 /*yield*/, admin.save()];
            case 6:
                // Save the updated admin document
                _b.sent();
                // Return success response
                return [2 /*return*/, res.status(200).json({ message: "Admin profile updated successfully", admin: admin })];
            case 7:
                error_4 = _b.sent();
                // Return error response if any error occurs
                return [2 /*return*/, res.status(500).json({ message: "Internal Server Error", error: error_4.message })];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.updateAdminProfile = updateAdminProfile;
// Function to delete admin by ID
var deleteAdminById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var deletedAdmin, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, admin_model_js_1.default.findByIdAndDelete(req.params.id)];
            case 1:
                deletedAdmin = _a.sent();
                if (deletedAdmin) {
                    res.status(200).json({ message: 'Admin deleted successfully' });
                }
                else {
                    console.log("id recieved", deletedAdmin);
                    res.status(404).json({ message: 'Admin not found' });
                }
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                res.status(500).json({ message: error_5.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteAdminById = deleteAdminById;
// Function to update admin profile by admin ID
// export const updateAdminProfileById = async (req: Request, res: Response) => {
//   try {
//     const updatedProfile = await AdminModel.findOneAndUpdate(
//       { _id: req.params.id },
//       { $set: { 'profile': req.body } },
//       { new: true }
//     );
//     if (updatedProfile) {
//       res.status(200).json(updatedProfile);
//     } else {
//       res.status(404).json({ message: 'Admin not found' });
//     }
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };
// Function to get all vendors
var getAllVendors = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var vendors, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, vendor_js_1.Vendor.find()];
            case 1:
                vendors = _a.sent();
                res.status(200).json(vendors);
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                res.status(500).json({ message: error_6.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllVendors = getAllVendors;
// Function to delete vendor by ID
var deleteVendorById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var deletedVendor, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, vendor_js_1.Vendor.findByIdAndDelete(req.params.id)];
            case 1:
                deletedVendor = _a.sent();
                if (deletedVendor) {
                    res.status(200).json({ message: 'Vendor deleted successfully' });
                }
                else {
                    res.status(404).json({ message: 'Vendor not found' });
                }
                return [3 /*break*/, 3];
            case 2:
                error_7 = _a.sent();
                res.status(500).json({ message: error_7.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteVendorById = deleteVendorById;
// Function to get all venue
var getAllVenues = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var vendors, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, venue_js_1.Venue.find()];
            case 1:
                vendors = _a.sent();
                res.status(200).json(vendors);
                return [3 /*break*/, 3];
            case 2:
                error_8 = _a.sent();
                res.status(500).json({ message: error_8.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllVenues = getAllVenues;
// Function to delete venue by ID
var deleteVenueById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var deletedVendor, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, venue_js_1.Venue.findByIdAndDelete(req.params.id)];
            case 1:
                deletedVendor = _a.sent();
                if (deletedVendor) {
                    res.status(200).json({ message: 'Vendor deleted successfully' });
                }
                else {
                    res.status(404).json({ message: 'Vendor not found' });
                }
                return [3 /*break*/, 3];
            case 2:
                error_9 = _a.sent();
                res.status(500).json({ message: error_9.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteVenueById = deleteVenueById;
// Function to get all Users
var getAllUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var vendors, error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_js_1.User.find()];
            case 1:
                vendors = _a.sent();
                res.status(200).json(vendors);
                return [3 /*break*/, 3];
            case 2:
                error_10 = _a.sent();
                res.status(500).json({ message: error_10.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllUsers = getAllUsers;
// Function to delete User by ID
var deleteUserById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var deletedVendor, error_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_js_1.User.findByIdAndDelete(req.params.id)];
            case 1:
                deletedVendor = _a.sent();
                if (deletedVendor) {
                    res.status(200).json({ message: 'Vendor deleted successfully' });
                }
                else {
                    res.status(404).json({ message: 'Vendor not found' });
                }
                return [3 /*break*/, 3];
            case 2:
                error_11 = _a.sent();
                res.status(500).json({ message: error_11.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteUserById = deleteUserById;
// Function to get all Bookings
// export const getAllBookings = async (req: Request, res: Response) => {
//   try {
//     const vendors = await VenueBooking.find();
//     res.status(200).json(vendors);
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };
// Function to delete vendor by ID
var deleteBookingById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var deletedVendor, error_12;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, vendor_js_1.Vendor.findByIdAndDelete(req.params.id)];
            case 1:
                deletedVendor = _a.sent();
                if (deletedVendor) {
                    res.status(200).json({ message: 'Vendor deleted successfully' });
                }
                else {
                    res.status(404).json({ message: 'Vendor not found' });
                }
                return [3 /*break*/, 3];
            case 2:
                error_12 = _a.sent();
                res.status(500).json({ message: error_12.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteBookingById = deleteBookingById;
