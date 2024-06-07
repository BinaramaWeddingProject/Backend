import { asyncHandler } from "../utils/asynHandler.js";
import VendorNotificationModel from "../models/notification/VendorNotif.js";
import VenueNotificationModel from "../models/notification/VenueNotif.js";
import AdminNotificationModel from "../models/notification/AdminNotif.js";
import UserNotificationModel from "../models/notification/UserNotif.js";
export const postNotificationVendor = asyncHandler(async (req, res, next) => {
    try {
        const { userId, venueId, message } = req.body;
        // const venue = await Venue.findById(vendorId);
        // const user= await User.findById(userId);
        // if(!vendor){{
        //     throw new ApiError(404 , "Vendor not found");
        // }
        res.status(201).json({
            success: true,
            // message: "Notifications fetched successfully",
            message,
            data: venueId,
        });
    }
    catch (error) {
        return next((error.message, 500));
    }
});
export const getNotificationVendor = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.params; // Assuming the ID is passed as a URL parameter
        // const notification = await VendorNotificationModel.findById(id).sort({ createdAt: -1 });
        // if (!notification) {
        //     return res.status(404).json({
        //         success: false,
        //         message: "Notification not found"
        //     });
        // }
        res.status(200).json({
            success: true,
            // notification
            id
        });
    }
    catch (error) {
        // Forward the error to the error handler middleware
        return next(error);
    }
});
export const updateVendorNotification = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.body;
        const notification = await VendorNotificationModel.findById(id);
        if (!notification) {
            return next("Notification not found");
        }
        else {
            console.log("Notification Title:", notification.title); // Log the notification title
            notification.status
                ? (notification.status = "read")
                : notification?.status;
        }
        await notification.save();
        const notifications = await VendorNotificationModel.find().sort({
            createdAt: -1,
        });
        res.status(201).json({
            success: true,
            notifications,
        });
    }
    catch (error) {
        return next((error.message, 500));
    }
});
export const postNotificationVenue = asyncHandler(async (req, res, next) => {
    try {
        const { userId, vendorId, message } = req.body;
        // const vendor = await Vendor.findById(vendorId);
        // const user= await User.findById(userId);
        // if(!vendor){{
        //     throw new ApiError(404 , "Vendor not found");
        // }
        res.status(201).json({
            success: true,
            // message: "Notifications fetched successfully",
            message,
            data: vendorId,
        });
    }
    catch (error) {
        return next((error.message, 500));
    }
});
export const getNotificationVenue = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.params; // Assuming the ID is passed as a URL parameter
        if (!id) {
            return "id not found";
        }
        // const notification = await VenueNotificationModel.findById(id).sort({ createdAt: -1 });
        // if (!notification) {
        //     return res.status(404).json({
        //         success: false,
        //         message: "Notification not found"
        //     });
        // }
        res.status(200).json({
            success: true,
            // notification
            id
        });
    }
    catch (error) {
        // Forward the error to the error handler middleware
        return next(error);
    }
});
export const updateVenueNotification = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.body;
        const notification = await VenueNotificationModel.findById(id);
        if (!notification) {
            return next("Notification not found");
        }
        else {
            console.log("Notification Title:", notification.title); // Log the notification title
            notification.status
                ? (notification.status = "read")
                : notification?.status;
        }
        await notification.save();
        const notifications = await VenueNotificationModel.find().sort({
            createdAt: -1,
        });
        res.status(201).json({
            success: true,
            notifications,
        });
    }
    catch (error) {
        return next((error.message, 500));
    }
});
//user
export const postNotificationUser = asyncHandler(async (req, res, next) => {
    try {
        const { userId, venueId, message } = req.body;
        // const user = await User.findById(userId);
        // const user= await User.findById(userId);
        // if(!vendor){{
        //     throw new ApiError(404 , "Vendor not found");
        // }
        res.status(201).json({
            success: true,
            // message: "Notifications fetched successfully",
            message,
            data: venueId,
        });
    }
    catch (error) {
        return next((error.message, 500));
    }
});
export const getNotificationUser = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.params; // Assuming the ID is passed as a URL parameter
        // const notification = await UserNotificationModel.findById(id).sort({ createdAt: -1 });
        // if (!notification) {
        //     return res.status(404).json({
        //         success: false,
        //         message: "Notification not found"
        //     });
        // }
        res.status(200).json({
            success: true,
            // notification
            id
        });
    }
    catch (error) {
        // Forward the error to the error handler middleware
        return next(error);
    }
});
export const updateUserNotification = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.body;
        const notification = await UserNotificationModel.findById(id);
        if (!notification) {
            return next("Notification not found");
        }
        else {
            console.log("Notification Title:", notification.title); // Log the notification title
            notification.status
                ? (notification.status = "read")
                : notification?.status;
        }
        await notification.save();
        const notifications = await UserNotificationModel.find().sort({
            createdAt: -1,
        });
        res.status(201).json({
            success: true,
            notifications,
        });
    }
    catch (error) {
        return next((error.message, 500));
    }
});
//admin
export const postNotificationAdmin = asyncHandler(async (req, res, next) => {
    try {
        const { userId, vendorId, venueId, message } = req.body;
        const venue = await VenueNotificationModel.findById(venueId);
        const vendor = await VendorNotificationModel.findById(vendorId);
        const user = await UserNotificationModel.findById(userId);
        // const user= await User.findById(userId);
        // if(!vendor){{
        //     throw new ApiError(404 , "Vendor not found");
        // }
        res.status(201).json({
            success: true,
            // message: "Notifications fetched successfully",
            message,
            data: venueId,
        });
    }
    catch (error) {
        return next((error.message, 500));
    }
});
export const getNotificationAdmin = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.params; // Assuming the ID is passed as a URL parameter
        // const notification = await AdminNotificationModel.findById(id).sort({ createdAt: -1 });
        // if (!notification) {
        //     return res.status(404).json({
        //         success: false,
        //         message: "Notification not found"
        //     });
        // }
        res.status(200).json({
            success: true,
            // notification
            id
        });
    }
    catch (error) {
        // Forward the error to the error handler middleware
        return next(error);
    }
});
export const updateAdminNotification = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.body;
        const notification = await AdminNotificationModel.findById(id);
        if (!notification) {
            return next("Notification not found");
        }
        else {
            console.log("Notification Title:", notification.title); // Log the notification title
            notification.status
                ? (notification.status = "read")
                : notification?.status;
        }
        await notification.save();
        const notifications = await AdminNotificationModel.find().sort({
            createdAt: -1,
        });
        res.status(201).json({
            success: true,
            notifications,
        });
    }
    catch (error) {
        return next((error.message, 500));
    }
});
