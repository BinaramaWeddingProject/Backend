"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodPackage = void 0;
var mongoose_1 = require("mongoose");
// FoodPackage schema
var FoodPackageSchema = new mongoose_1.Schema({
    vegCategory: {
        name: { type: String, default: "Veg" },
        packagePrice: { type: Number, required: true },
        subCategories: [
            {
                name: { type: String, required: true },
                quantity: { type: Number, required: true }
            }
        ]
    },
    nonVegCategory: {
        name: { type: String, default: "Non-Veg" },
        packagePrice: { type: Number, required: true },
        subCategories: [
            {
                name: { type: String, required: true },
                quantity: { type: Number, required: true }
            }
        ]
    }
}, { timestamps: true });
exports.FoodPackage = mongoose_1.default.model("FoodPackage", FoodPackageSchema);
