import { Vendor } from "../models/vendor.js";
import { asyncHandler } from "../utils/asynHandler.js";
import { User } from "../models/user.js";
import VendorNotificationModel from "../models/notification/VendorNotif.js";
import VenueNotificationModel from "../models/notification/VenueNotif.js";
import AdminNotificationModel from "../models/notification/AdminNotif.js";
import UserNotificationModel from "../models/notification/UserNotif.js";
import NotificationModel from "../models/notification/notification.js";
import { Venue } from "../models/venue.js";
// export const postNotification = asyncHandler(
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { userId, city } = req.body;
//       const vendors = await Vendor.find({ city });
//       var vendorIds,
//        if (!userId){
//        if(vendors){
//       vendorIds = vendors.map((vendor) => vendor._id);
//       // Create a new notification instance
//       const newNotification: INotification = new NotificationModel({
//         vendorIds,
//         userId,
//         city,
//       });
//       // Save the notification to the database
//       const savedNotification: INotification = await newNotification.save();
//       // Send a success response
//       res.status(201).json({ notification: savedNotification });
//         } else { return "no vendors found" }
//       } else {
//       }
//     } catch (error) {
//       next(error);
//     }
//   }
// );
// export const postNotification = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
//   try {
//       const { userId, city } = req.body;
//       // Fetch all vendors for the given city
//       const vendors = await Vendor.find({ city });
//       const venue= await Venue.find({city});
//       if (!vendors.length && !venue.length) {
//           return res.status(404).json({ error: 'No vendors found' });
//       }
//       const vendorIds = vendors.map(vendor => vendor._id);
//       // If userId is available, update the existing notification
//       if (userId) {
//           let existingNotification = await NotificationModel.findOne({ userId });
//           // Check if existingNotification is null
//           if (!existingNotification) {
//               return res.status(404).json({ error: 'Notification not found' });
//           }
//           // Check if existingNotification.vendorIds is undefined
//           if (existingNotification.vendorIds === undefined) {
//               existingNotification.vendorIds = [];
//           }
//           // Check if the city already exists in the city array
//           if (!existingNotification.city.includes(city)) {
//               // If the city doesn't exist, add it to the city array
//               existingNotification.city.push(city);
//           }
//           // Add new vendorIds to the existing ones if they are not already present
//           vendorIds.forEach(vendorId => {
//               if (!existingNotification?.vendorIds?.includes(vendorId)) {
//                   existingNotification!.vendorIds!.push(vendorId);
//               }
//           });
//           // Save the updated notification
//           existingNotification = await existingNotification.save();
//           // Send a success response
//           return res.json({ notification: existingNotification });
//       }
//       // If userId is not available, create a new notification
//       const newNotification = new NotificationModel({
//           vendorIds,
//           userId,
//           city: [city], // Start with an array containing the new city
//       });
//       // Save the notification to the database
//       const savedNotification = await newNotification.save();
//       // Send a success response
//       res.status(201).json({ notification: savedNotification });
//   } catch (error) {
//       next(error);
//   }
// });
// export const postNotification = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
//   try {
//       const { userId, city, flag } = req.body;
//       // Fetch all vendors and venues for the given city
//       const vendors = await Vendor.find({ city });
//       const venues = await Venue.find({ city });
//       if (!vendors.length && !venues.length) {
//           return res.status(404).json({ error: 'No vendors or venues found' });
//       }
//       const vendorIds = vendors.map(vendor => vendor._id);
//       const venueIds = venues.map(venue => venue._id);
//       // If userId is available, update the existing notification
//       if (userId) {
//           let existingNotification = await NotificationModel.findOne({ userId });
//           // Check if existingNotification is null
//           if (!existingNotification) {
//               return res.status(404).json({ error: 'Notification not found' });
//           }
//           // Check if existingNotification.vendorIds is undefined
//           if (existingNotification.vendorIds === undefined) {
//               existingNotification.vendorIds = [];
//           }
//           // Check if the city already exists in the city array
//           if (!existingNotification.city.includes(city)) {
//               // If the city doesn't exist, add it to the city array
//               existingNotification.city.push(city);
//           }
//           // Add new vendorIds to the existing ones if they are not already present
//           vendorIds.forEach(vendorId => {
//               if (!existingNotification?.vendorIds?.includes(vendorId)) {
//                   existingNotification!.vendorIds!.push(vendorId);
//               }
//           });
//           // Add new venueIds to the existing ones if they are not already present
//           venueIds.forEach(venueId => {
//               if (!existingNotification?.venueIds?.includes(venueId)) {
//                   existingNotification!.venueIds!.push(venueId);
//               }
//           });
//           // Save the updated notification
//           existingNotification = await existingNotification.save();
//           // Send a success response
//           return res.json({ notification: existingNotification });
//       }
//       // If userId is not available, create a new notification
//       const newNotification = new NotificationModel({
//           vendorIds,
//           venueIds,
//           userId,
//           city: [city], // Start with an array containing the new city
//       });
//       // Save the notification to the database
//       const savedNotification = await newNotification.save();
//       // Send a success response
//       res.status(201).json({ notification: savedNotification });
//   } catch (error) {
//       next(error);
//   }
// });
export const postNotification = asyncHandler(async (req, res, next) => {
    try {
        const { userId, city, flag } = req.body;
        // Fetch all vendors and venues for the given city
        let vendorIds = [];
        let venueIds = [];
        if (flag === "vendor") {
            const vendors = await Vendor.find({ city });
            if (!vendors.length) {
                return res.status(404).json({ error: "No vendors found" });
            }
            vendorIds = vendors.map((vendor) => vendor._id);
        }
        else if (flag === "venue") {
            const venues = await Venue.find({ city });
            if (!venues.length) {
                return res.status(404).json({ error: "No venues found" });
            }
            venueIds = venues.map((venue) => venue._id);
        }
        else {
            return res.status(400).json({ error: "Invalid flag value" });
        }
        // If userId is available, update the existing notification
        if (userId) {
            let existingNotification = await NotificationModel.findOne({ userId });
            // Check if existingNotification is null
            if (!existingNotification) {
                return res.status(404).json({ error: "Notification not found" });
            }
            // Check if existingNotification.vendorIds is undefined
            if (existingNotification.vendorIds === undefined) {
                existingNotification.vendorIds = [];
            }
            // Check if the city already exists in the city array
            if (!existingNotification.city.includes(city)) {
                // If the city doesn't exist, add it to the city array
                existingNotification.city.push(city);
            }
            // Add new vendorIds to the existing ones if they are not already present
            vendorIds.forEach((vendorId) => {
                if (!existingNotification?.vendorIds?.includes(vendorId)) {
                    existingNotification.vendorIds.push(vendorId);
                }
            });
            // Add new venueIds to the existing ones if they are not already present
            venueIds.forEach((venueId) => {
                if (!existingNotification?.venueIds?.includes(venueId)) {
                    existingNotification.venueIds.push(venueId);
                }
            });
            // Save the updated notification
            existingNotification = await existingNotification.save();
            // Send a success response
            return res.json({ notification: existingNotification });
        }
        // If userId is not available, create a new notification
        const newNotification = new NotificationModel({
            vendorIds,
            venueIds,
            userId,
            city: [city], // Start with an array containing the new city
        });
        // Save the notification to the database
        const savedNotification = await newNotification.save();
        // Send a success response
        res.status(201).json({ notification: savedNotification });
    }
    catch (error) {
        next(error);
    }
});
// export const getNotification = asyncHandler(
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { vendorId } = req.params;
//       console.log("vendor id", vendorId);
//       const notifications = await NotificationModel.find({
//         vendorIds: { $in: vendorId },
//       });
//       const userIds = notifications.map((notification) => notification.userId);
//       const users = await User.find({ _id: { $in: userIds } });
//       res.json({ users });
//     } catch (error) {
//       next(error);
//     }
//   }
// );
export const getNotification = asyncHandler(async (req, res, next) => {
    try {
        const { vendorId } = req.params;
        console.log("vendor id", vendorId);
        // Find notifications related to vendors
        const vendorNotifications = await NotificationModel.find({
            vendorIds: { $in: vendorId },
        });
        const vendorUserIds = vendorNotifications.map((notification) => notification.userId);
        // Find notifications related to venues
        const venueNotifications = await NotificationModel.find({
            venueIds: { $in: vendorId },
        });
        const venueUserIds = venueNotifications.map((notification) => notification.userId);
        // Merge user IDs from both vendor and venue notifications
        const userIds = [...vendorUserIds, ...venueUserIds];
        // Fetch users based on the merged user IDs
        const users = await User.find({ _id: { $in: userIds } });
        res.json({ users });
    }
    catch (error) {
        next(error);
    }
});
// export const updateNotification = asyncHandler(
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { id, city } = req.body;
//     }
//     catch (error) {
//       next(error);
//     }
//   }
// )
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
            id,
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
            id,
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
            id,
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
            id,
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
