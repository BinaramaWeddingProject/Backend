"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
var multer_1 = require("multer");
var storage = multer_1.default.diskStorage({
    destination: function (req, // Explicitly type the req parameter
    file, // Explicitly type the file parameter
    cb // Explicitly type the callback parameter
    ) {
        cb(null, "./public/temp");
    },
    filename: function (req, // Explicitly type the req parameter
    file, // Explicitly type the file parameter
    cb // Explicitly type the callback parameter
    ) {
        cb(null, file.originalname);
    },
});
exports.upload = (0, multer_1.default)({
    storage: storage,
});
