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
exports.getAllRealWeddings = exports.UpdateRealWeddingsPost = exports.DeleteRealWeddingsById = exports.GetRealWeddingsPostById = exports.addItemToRealWeddingsPost = void 0;
var apiResponse_js_1 = require("../utils/apiResponse.js");
var apiError_js_1 = require("../utils/apiError.js");
var cloudniary_js_1 = require("../utils/cloudniary.js");
var asynHandler_js_1 = require("../utils/asynHandler.js");
var realweddings_js_1 = require("../models/realweddings.js");
//add a new wedding post
var addItemToRealWeddingsPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, content, author, eventDate, organizerName, givenFiles, realWeddings_1, imageUrls, realWeddings, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                console.log("post request");
                _a = req.body, title = _a.title, content = _a.content, author = _a.author, eventDate = _a.eventDate, organizerName = _a.organizerName;
                givenFiles = req.files;
                if (!(!givenFiles || givenFiles.length === 0)) return [3 /*break*/, 2];
                return [4 /*yield*/, realweddings_js_1.default.create({
                        title: title,
                        content: content,
                        author: author,
                        eventDate: eventDate,
                        organizerName: organizerName,
                        images: [], // Set an empty array for images
                    })];
            case 1:
                realWeddings_1 = _b.sent();
                return [2 /*return*/, res.status(201).json(new apiResponse_js_1.ApiResponse(200, { realWeddings: realWeddings_1 }, "New realWeddings created successfully"))];
            case 2: return [4 /*yield*/, (0, cloudniary_js_1.uploadOnCloudinary)(givenFiles)];
            case 3:
                imageUrls = _b.sent();
                return [4 /*yield*/, realweddings_js_1.default.create({
                        title: title,
                        content: content,
                        author: author,
                        eventDate: eventDate,
                        organizerName: organizerName,
                        images: imageUrls,
                    })];
            case 4:
                realWeddings = _b.sent();
                return [2 /*return*/, res.status(201).json(new apiResponse_js_1.ApiResponse(200, { realWeddings: realWeddings }, "New realWeddings created successfully"))];
            case 5:
                error_1 = _b.sent();
                console.error('Error adding item to RealWeddingsList:', error_1);
                return [2 /*return*/, res.status(500).json({ message: 'Internal server error' })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.addItemToRealWeddingsPost = addItemToRealWeddingsPost;
//get wedding Post by ID
exports.GetRealWeddingsPostById = (0, asynHandler_js_1.asyncHandler)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, realWeddings;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, realweddings_js_1.default.findById(id)];
            case 1:
                realWeddings = _a.sent();
                if (!realWeddings) {
                    throw new apiError_js_1.ApiError(404, "No realWeddings Found!!");
                }
                return [2 /*return*/, res.status(200).json(new apiResponse_js_1.ApiResponse(200, { realWeddings: realWeddings }, "Here is the realWeddings"))];
        }
    });
}); });
//delete wedding Post by ID
exports.DeleteRealWeddingsById = (0, asynHandler_js_1.asyncHandler)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, realWeddings, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, realweddings_js_1.default.findById(id)];
            case 1:
                realWeddings = _a.sent();
                if (!realWeddings) {
                    throw new apiError_js_1.ApiError(404, "No realWeddings Found!!!");
                }
                return [4 /*yield*/, realweddings_js_1.default.findByIdAndDelete(id)];
            case 2:
                response = _a.sent();
                return [2 /*return*/, res.status(200).json(new apiResponse_js_1.ApiResponse(200, { response: response }, "realWeddings Deleted Successfully "))];
        }
    });
}); });
//update details of the weddings Post
exports.UpdateRealWeddingsPost = (0, asynHandler_js_1.asyncHandler)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, updateFields, givenFiles, realWeddings, imageUrls, _i, _a, _b, key, value;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                id = req.params.id;
                updateFields = req.body;
                givenFiles = req.files;
                console.log("file", givenFiles);
                return [4 /*yield*/, realweddings_js_1.default.findById(id)];
            case 1:
                realWeddings = _c.sent();
                if (!realWeddings) {
                    throw new apiError_js_1.ApiError(404, "No realWeddings Found!!!");
                }
                if (!((givenFiles === null || givenFiles === void 0 ? void 0 : givenFiles.length) > 0)) return [3 /*break*/, 3];
                console.log(givenFiles);
                return [4 /*yield*/, (0, cloudniary_js_1.uploadOnCloudinary)(givenFiles)];
            case 2:
                imageUrls = _c.sent();
                if (imageUrls)
                    realWeddings.images = imageUrls;
                _c.label = 3;
            case 3:
                // Update all fields present in req.body
                for (_i = 0, _a = Object.entries(updateFields); _i < _a.length; _i++) {
                    _b = _a[_i], key = _b[0], value = _b[1];
                    if (value == undefined)
                        continue;
                    if (key !== '_id' && key !== '__v' && value != undefined) {
                        realWeddings[key] = value;
                    }
                }
                return [4 /*yield*/, realWeddings.save()];
            case 4:
                _c.sent();
                return [2 /*return*/, res.status(200).json(new apiResponse_js_1.ApiResponse(200, "realWeddings Updated Successfully!!"))];
        }
    });
}); });
//get all weddings Post
exports.getAllRealWeddings = (0, asynHandler_js_1.asyncHandler)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var realWeddings;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, realweddings_js_1.default.find()];
            case 1:
                realWeddings = _a.sent();
                if (!realWeddings || realWeddings.length === 0) {
                    throw new apiError_js_1.ApiError(404, "No realWeddings in DB");
                }
                return [2 /*return*/, res.status(200).json(new apiResponse_js_1.ApiResponse(200, { realWeddings: realWeddings }, "here are the realWeddings."))];
        }
    });
}); });
