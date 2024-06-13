// import mongoose, { Schema, Document } from 'mongoose';
export {};
// // Define interfaces for your data
// interface Notification {
//     title: string;
//     message: string;
//     status: string;
//     userId?: string;
//     vendorId?: string;
//     venueId?: string;
// }
// interface VendorNotification extends Notification {
//     vendorId: string;
// }
// interface VenueNotification extends Notification {
//     venueId: string;
// }
// interface AdminNotification extends Notification {
//     vendorId?: string;
//     venueId?: string;
// }
// interface UserNotification extends Notification {
//     userId: string;
//     vendorId?: string;
//     venueId?: string;
// }
// // Define schemas
// const vendorNotificationSchema = new Schema<VendorNotification>({
//     title: { type: String, required: true },
//     message: { type: String, required: true },
//     status: { type: String, required: true },
//     userId: { type: String },
//     vendorId: { type: String, required: true }
// });
// const venueNotificationSchema = new Schema<VenueNotification>({
//     title: { type: String, required: true },
//     message: { type: String, required: true },
//     status: { type: String, required: true },
//     userId: { type: String },
//     venueId: { type: String, required: true }
// });
// const adminNotificationSchema = new Schema<AdminNotification>({
//     title: { type: String, required: true },
//     message: { type: String, required: true },
//     status: { type: String, required: true },
//     userId: { type: String },
//     vendorId: { type: String },
//     venueId: { type: String }
// });
// const userNotificationSchema = new Schema<UserNotification>({
//     title: { type: String, required: true },
//     message: { type: String, required: true },
//     status: { type: String, required: true },
//     userId: { type: String, required: true },
//     vendorId: { type: String },
//     venueId: { type: String }
// });
// // Create models
// const VendorNotificationModel = mongoose.model<VendorNotification>('VendorNotification', vendorNotificationSchema);
// const VenueNotificationModel = mongoose.model<VenueNotification>('VenueNotification', venueNotificationSchema);
// const AdminNotificationModel = mongoose.model<AdminNotification>('AdminNotification', adminNotificationSchema);
// const UserNotificationModel = mongoose.model<UserNotification>('UserNotification', userNotificationSchema);
// export { VendorNotificationModel, VenueNotificationModel, AdminNotificationModel, UserNotificationModel };
