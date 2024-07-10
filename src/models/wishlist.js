"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
// Define schema for wishlist item
var wishlistItemSchema = new mongoose_1.Schema({
    itemId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    itemType: { type: String, enum: ['vendor', 'venue'], required: true },
    selected: { type: Boolean, default: false } // Default to unselected
});
// Define schema for wishlist document
var wishlistSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    items: { type: [wishlistItemSchema], default: [] }
});
// Create model for Wishlist
var WishlistModel = mongoose_1.default.model('Wishlist', wishlistSchema);
exports.default = WishlistModel;
