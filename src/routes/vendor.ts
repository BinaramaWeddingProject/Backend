import { Router } from "express";
import {Register, UpdateVendor , GetVendorById , DeleteVendorById, ShowAllVendors, searchVendorsByCity } from "../controllers/vendor.js"
import { upload } from "../middlewares/multer.js";

const router = Router();

//post
router.route("/register").post(Register);

//put
router.route("/:id").put(upload.array('image' , 3),UpdateVendor);

//get
router.route("/all").get(ShowAllVendors);

// GET - Retrieve a vendor by ID
router.get("/:id", GetVendorById);

// GET - Search vendors by city
router.get(":city", searchVendorsByCity);

//delete
router.route("/:id").delete(DeleteVendorById)




export default router;