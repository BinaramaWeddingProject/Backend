import { Vendor } from "../models/vendor.js";
import { asyncHandler } from "../utils/asynHandler.js";
import { User } from "../models/user.js";
import NotificationModel from "../models/notification/notification.js";
import { Venue } from "../models/venue.js";
// export const postNotification = asyncHandler(
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { userId, city, flag } = req.body;
//       // Fetch all vendors and venues for the given city
//       let vendorIds: string[] = [];
//       let venueIds: string[] = [];
//       if (flag === "vendor") {
//         const vendors = await Vendor.find({ city });
//         if (!vendors.length) {
//           return res.status(404).json({ error: "No vendors found" });
//         }
//         vendorIds = vendors.map((vendor) => vendor._id);
//       } else if (flag === "venue") {
//         const venues = await Venue.find({ city });
//         if (!venues.length) {
//           return res.status(404).json({ error: "No venues found" });
//         }
//         venueIds = venues.map((venue) => venue._id);
//       } else {
//         return res.status(400).json({ error: "Invalid flag value" });
//       }
//       // If userId is available, update the existing notification
//       if (userId) {
//         let existingNotification = await NotificationModel.findOne({ userId });
//         // Check if existingNotification is null
//         if (!existingNotification) {
//           return res.status(404).json({ error: "Notification not found" });
//         }
//         // Check if existingNotification.vendorIds is undefined
//         if (existingNotification.vendorIds === undefined) {
//           existingNotification.vendorIds = [];
//         }
//         // Check if the city already exists in the city array
//         if (!existingNotification.city.includes(city)) {
//           // If the city doesn't exist, add it to the city array
//           existingNotification.city.push(city);
//         }
//         // Add new vendorIds to the existing ones if they are not already present
//         vendorIds.forEach((vendorId) => {
//           if (!existingNotification?.vendorIds?.includes(vendorId)) {
//             existingNotification!.vendorIds!.push(vendorId);
//           }
//         });
//         // Add new venueIds to the existing ones if they are not already present
//         venueIds.forEach((venueId) => {
//           if (!existingNotification?.venueIds?.includes(venueId)) {
//             existingNotification!.venueIds!.push(venueId);
//           }
//         });
//         // Save the updated notification
//         existingNotification = await existingNotification.save();
//         // Send a success response
//         return res.json({ notification: existingNotification });
//       }
//       // If userId is not available, create a new notification
//       const newNotification = new NotificationModel({
//         vendorIds,
//         venueIds,
//         userId,
//         city: [city], // Start with an array containing the new city
//       });
//       // Save the notification to the database
//       const savedNotification = await newNotification.save();
//       // Send a success response
//       res.status(201).json({ notification: savedNotification });
//     } catch (error) {
//       next(error);
//     }
//   }
// );
export const postNotification = asyncHandler(async (req, res, next) => {
    try {
        const { userId, city, flag } = req.body;
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
        // Find or create the notification for the user
        let existingNotification = await NotificationModel.findOne({ userId });
        if (!existingNotification) {
            // If notification doesn't exist, create a new one
            existingNotification = new NotificationModel({
                vendors: flag === "vendor" ? vendorIds.map(vendorId => ({ vendorId, status: "unread" })) : [],
                venues: flag === "venue" ? venueIds.map(venueId => ({ venueId, status: "unread" })) : [],
                userId,
                city: [city],
            });
        }
        else {
            // Check if the city already exists in the city array
            if (!existingNotification.city.includes(city)) {
                existingNotification.city.push(city);
            }
            // Add new vendors to the existing ones if they are not already present
            if (flag === "vendor") {
                vendorIds.forEach((vendorId) => {
                    if (!existingNotification?.vendors?.some(vendor => vendor.vendorId === vendorId)) {
                        existingNotification?.vendors?.push({ vendorId, status: "unread" });
                    }
                });
            }
            // Add new venueIds to the existing ones if they are not already present
            if (flag === "venue") {
                venueIds.forEach((venueId) => {
                    console.log("loadking", existingNotification?.venues?.some(venues => venues.venueId === venueId));
                    if (!existingNotification?.venues?.some(venues => venues.venueId === venueId)) {
                        // console.log("hello");
                        existingNotification.venues.push({ venueId, status: "unread" });
                    }
                });
            }
        }
        // Save the notification to the database
        existingNotification = await existingNotification.save();
        // Send a success response
        res.status(201).json({ notification: existingNotification });
    }
    catch (error) {
        next(error);
    }
});
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
export const updateNotification = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        let notification = await NotificationModel.findById(id);
        if (!notification) {
            return next("Notification not found");
        }
        else {
            console.log("Notification Title:", notification.status);
            notification.status = "read";
            await notification.save(); // Save the updated notification status to MongoDB
        }
        res.status(200).json({
            success: true,
            status: notification.status // Return the updated status in the response
        });
    }
    catch (error) {
        next(error);
    }
});
export const getAllNotification = asyncHandler(async (req, res, next) => {
    try {
        const notifications = await NotificationModel.find();
        res.status(200).json({
            success: true,
            notifications,
        });
    }
    catch (error) {
        next(error);
    }
});
