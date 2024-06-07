import mongoose, { Document, Model, Schema } from "mongoose";


export interface IAdminNotification extends Document {
    title?: string;
    message?: string;
    status?: string;
    userId?: string;
    vendorId?: string;
}

const AdminNotificationSchema= new Schema<IAdminNotification>(
    {
        title:{
        type: String,
        required: true
    },
    message:{
        type:String,
        required: true,
    },
    status:{
        type: String,
        required: true,
        default: "unread"
    },
    userId:{
        type: String,
        required: true
    },
    vendorId:{
        type: String,
        required: true
    },
    },{timestamps: true});

    export const AdminNotificationModel: Model<IAdminNotification>= mongoose.model("AdminNotification", AdminNotificationSchema);

    export default AdminNotificationModel;