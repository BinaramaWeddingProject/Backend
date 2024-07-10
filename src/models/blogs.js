"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var blogSchema = new mongoose_1.Schema({
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
    category: {
        type: String,
        // required: true
    }
}, {
    timestamps: true,
});
var BlogModel = mongoose_1.default.model("Blog", blogSchema);
exports.default = BlogModel;
