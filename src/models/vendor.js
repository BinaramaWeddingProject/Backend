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
exports.Vendor = void 0;
var mongoose_1 = require("mongoose");
var validator_1 = require("validator");
var bcrypt_1 = require("bcrypt");
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
var VendorSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Please provide name"],
    },
    email: {
        type: String,
        required: [true, "Please enter email"],
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function (value) { return validator_1.default.isEmail(value); },
            message: function (props) { return "".concat(props.value, " is not a valid email address!"); },
        },
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    },
    phone: {
        type: String,
        required: [true, "Please provide contact number"],
    },
    address: {
        type: String,
    },
    city: {
        type: String,
        required: [true, "Please provide your city"],
    },
    state: {
        type: String,
    },
    businessName: {
        type: String,
    },
    type_Of_Business: {
        type: String,
    },
    packages: {
        name: {
            type: String,
        },
        days: {
            type: String,
        },
        price: {
            type: String,
        },
        minAdvance: {
            type: String,
        },
    },
    portfolio: {
        type: [String],
    },
    experience: {
        type: String,
    },
    event_completed: {
        type: Number,
    },
    willingToTravel: {
        type: Boolean,
    },
    isVerified: {
        type: String,
        enum: ['Approved', 'Rejected', 'Pending'],
        default: 'Pending',
    },
    usp: {
        type: String,
    },
    summary: {
        type: String,
    },
    price: {
        type: String,
    },
    bookingPolicy: {
        type: String,
    },
    cancellationPolicy: {
        type: String,
    },
    termAndConditions: {
        type: String,
    },
    review: {
        type: [mongoose_1.default.Types.ObjectId],
        ref: "Review",
    },
    refreshToken: {
        type: String,
    },
}, {
    timestamps: true,
});
// Password encryption
VendorSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!this.isModified("password"))
                        return [2 /*return*/, next()];
                    _a = this;
                    return [4 /*yield*/, bcrypt_1.default.hash(this.password, 10)];
                case 1:
                    _a.password = _b.sent();
                    next();
                    return [2 /*return*/];
            }
        });
    });
});
// Compare the password
VendorSchema.methods.isPasswordCorrect = function (password) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, bcrypt_1.default.compare(password, this.password)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
};
// // Generate access token
// VendorSchema.methods.generateAccessToken = function (): string {
//   if (!process.env.ACCESS_TOKEN_SECRET || !process.env.ACCESS_TOKEN_EXPIRY) {
//     throw new Error('Missing ACCESS_TOKEN_SECRET or ACCESS_TOKEN_EXPIRY environment variable');
//   }
//   return jwt.sign(
//     {
//       _id: this._id,
//     },
//     process.env.ACCESS_TOKEN_SECRET,
//     {
//       expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
//     }
//   );
// }
// // Generate refresh token
// VendorSchema.methods.generateRefreshToken = function (): string {
//   if (!process.env.REFRESH_TOKEN_SECRET || !process.env.REFRESH_TOKEN_EXPIRY) {
//     throw new Error('Missing REFRESH_TOKEN_SECRET or REFRESH_TOKEN_EXPIRY environment variable');
//   }
//   return jwt.sign(
//     {
//       _id: this._id,
//     },
//     process.env.REFRESH_TOKEN_SECRET,
//     {
//       expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
//     }
//   );
// }
exports.Vendor = mongoose_1.default.model("Vendor", VendorSchema);
