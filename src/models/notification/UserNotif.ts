import mongoose, { Document, Model, Schema } from "mongoose";

interface IUserNotification extends Document {
    title?: string;
    message?: string;
    status?: string;
    userId?: string;
    vendorId?: string;
    venueId?: string;
}

const UserNotificationSchema = new Schema<IUserNotification>({
    title: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, required: true, default:"unread" },
    userId: { type: String, required: true },
    vendorId: { type: String },
    venueId: { type: String }
});

const UserNotificationModel = mongoose.model<IUserNotification>('UserNotification', UserNotificationSchema);

export default UserNotificationModel;