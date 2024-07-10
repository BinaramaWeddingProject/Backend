"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var wishlist_js_1 = require("../controllers/wishlist.js");
var router = express_1.default.Router();
// Route to add an item to the wishlist
router.post('/wishlist/add', wishlist_js_1.addItemToWishlist);
// Route to remove an item from the wishlist
router.delete('/wishlist/remove', wishlist_js_1.removeItemFromWishlist);
// Route to get the user's wishlist
router.get('/wishlist/:userId', wishlist_js_1.getUserWishlist);
exports.default = router;
