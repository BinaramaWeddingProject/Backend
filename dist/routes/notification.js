import { Router } from "express";
import { getNotificationVendor, getNotificationVenue, postNotificationVendor, postNotificationVenue } from "../controllers/noficication.js";
const router = Router();
//post notification
router.route("/notificationvendor").post(postNotificationVendor);
router.route("/notificationvenue").post(postNotificationVenue);
router.route("/getnotificationvendor/:id").get(getNotificationVendor);
router.route("/getnotificationvenue/:id").get(getNotificationVenue);
export default router;
