"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
var mongoose_1 = require("mongoose");
var ReviewSchema = new mongoose_1.default.Schema({
    user_id: {
        type: mongoose_1.default.Types.ObjectId,
        //ref: "User",
    },
    prodcuct_id: {
        //TODO
        type: mongoose_1.default.Types.ObjectId,
        ref: "Vendor",
    },
    rating: {
        type: Number
    },
    reviewText: {
        type: String
    },
    city: {
        type: String
    }
}, { timestamps: true });
exports.Review = mongoose_1.default.model("Review", ReviewSchema);
