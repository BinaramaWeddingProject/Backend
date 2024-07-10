"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var RealWeddingsSchema = new mongoose_1.Schema({
    title: {
        type: String,
        requried: [true, "Title is Required"],
    },
    images: {
        type: [String]
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        // required:true
    },
    organizerName: {
        type: String,
        // required: true
    },
    eventDate: {
        type: Date
    }
}, {
    timestamps: true,
});
var RealWeddingsModel = mongoose_1.default.model("RealWeddings", RealWeddingsSchema);
exports.default = RealWeddingsModel;
