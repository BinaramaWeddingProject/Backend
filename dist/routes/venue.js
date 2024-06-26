import { Router } from "express";
import { DeleteVenueById, GetVenueById, Login, Register, UpdateVenue, searchvenuesByCity, topVenues, filterVenues } from "../controllers/venue.js";
import { upload } from "../middlewares/multer.js";
const router = Router();
//post
router.route("/register").post(Register);
router.route("/login").post(Login);
//get
router.route("/all").get(filterVenues);
// router.route("/all").get(ShowAllVenues);
// //get
// router.route("/all").get(ShowAllVenues);
// GET - Retrieve a vendor by ID
router.get("/:id", GetVenueById);
//PUT - Update venue data
router.route("/:id").put(upload.array('image', 20), UpdateVenue);
// GET - Search vendors by city
router.get("search_venues/:city", searchvenuesByCity);
//delete
router.route("/:id").delete(DeleteVenueById);
//ranked venues
router.route("/ranked/venues").get(topVenues);
export default router;
