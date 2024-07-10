"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var notification_js_1 = require("../controllers/notification.js");
var router = (0, express_1.Router)();
//notification
// //vendor
// router.route("/notificationvendor").post(postNotificationVendor);
// router.route("/getnotificationvendor/:id").get(getNotificationVendor);
// router.route("/getnotificationvenue/:id").put(updateVendorNotification);
// //venue
// router.route("/notificationvenue").post(postNotificationVenue);
// router.route("/getnotificationvenue/:id").get(getNotificationVenue);
// router.route("/getnotificationvenue/:id").put(updateVenueNotification);
// //user
// router.route("/notificationvenue").post(postNotificationUser);
// router.route("/getnotificationvenue/:id").get(getNotificationUser);
// router.route("/getnotificationvenue/:id").put(updateUserNotification);
// //venue
// router.route("/notificationvenue").post(postNotificationAdmin);
// router.route("/getnotificationvenue/:id").get(getNotificationAdmin);
// router.route("/getnotificationvenue/:id").put(updateAdminNotification);
//all vendor
router.route("/city").post(notification_js_1.postNotification);
router.route("/:vId").get(notification_js_1.getNotification);
router.route("/update").patch(notification_js_1.updateNotification);
router.route("/notif/:nId").get(notification_js_1.getNotificationByIdStatus);
router.route("/notification/:vId").get(notification_js_1.getAllNotificationsByVendorId);
exports.default = router;
