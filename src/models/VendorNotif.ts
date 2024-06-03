import mongoose, { Document, Model, Schema } from "mongoose";


export interface IVendorNotification extends Document {
    title: string;
    message: string;
    status: string;
    userId: string;
    vendorId: string;
}

const VendorNotificationSchema= new Schema<IVendorNotification>(
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

    export const VendorNotificationModel: Model<IVendorNotification>= mongoose.model("notification", VendorNotificationSchema);

    export default VendorNotificationModel;