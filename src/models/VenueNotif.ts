import mongoose, { Document, Model, Schema } from "mongoose";

export interface IVenueNotification extends Document {
    title: string;
    message: string;
    status: string;
    userId: string;
    venueId: string;
}

const VenueNotificationSchema = new Schema<IVenueNotification>(
    {
        title: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true,
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
        venueId: {
            type: String,
            required: true
        },
    },
    { timestamps: true }
);

export const VenueNotificationModel: Model<IVenueNotification> = mongoose.model("VenueNotification", VenueNotificationSchema);

export default VenueNotificationModel;
