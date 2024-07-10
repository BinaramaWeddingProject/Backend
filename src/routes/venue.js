"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var venue_js_1 = require("../controllers/venue.js");
var multer_js_1 = require("../middlewares/multer.js");
var Admin_js_1 = require("../middlewares/Admin.js");
var router = (0, express_1.Router)();
//post
router.route("/register").post(venue_js_1.Register);
router.route("/login").post(venue_js_1.Login);
//get
router.route("/all").get(venue_js_1.filterVenues);
// GET - Retrieve a vendor by ID
router.get("/:id", venue_js_1.GetVenueById);
//PUT - Update venue data
router.route("/:id").put(multer_js_1.upload.array('images', 20), venue_js_1.UpdateVenue);
// GET - Search vendors by city
router.get("search_venues/:city", venue_js_1.searchvenuesByCity);
//delete
router.route("/:id").delete(Admin_js_1.checkAdmin, venue_js_1.DeleteVenueById);
//ranked venues
router.route("/ranked/venues").get(venue_js_1.topVenues);
exports.default = router;
