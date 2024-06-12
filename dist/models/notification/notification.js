import mongoose, { Schema } from "mongoose";
const NotificationSchema = new Schema({
    vendorIds: [{
            type: String,
        }],
    venueIds: [{
            type: String,
        }],
    message: {
        type: String,
    },
    status: {
        type: String,
        required: true,
        default: "unread"
    },
    userId: {
        type: String,
        required: true
    },
    city: [{
            type: String,
            required: true
        }],
}, { timestamps: true });
export const NotificationModel = mongoose.model("Notification", NotificationSchema);
export default NotificationModel;
