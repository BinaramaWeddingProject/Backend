import { Router } from "express";
import { DeleteVenueById, GetVenueById, Login, Register, ShowAllVenues, searchvenuesByCity } from "../controllers/venue.js";
const router = Router();
//post
router.route("/register").post(Register);
router.route("/login").post(Login);
//get
router.route("/all").get(ShowAllVenues);
// GET - Retrieve a vendor by ID
router.get("/:id", GetVenueById);
// GET - Search vendors by city
router.get("search_venues/:city", searchvenuesByCity);
//delete
router.route("/:id").delete(DeleteVenueById);
export default router;
