import mongoose, {Document, Schema} from "mongoose";

export interface IRealWeddings extends Document {
    title?: string;
    images?: string[];
    content?: string;
    author?: string;
    eventDate?: Date;
    organizerName?: string;
}

const RealWeddingsSchema = new Schema<IRealWeddings>(
    {
        title: {
            type: String,
            requried: [true, "Title is Required"],
        },

        images: {
            type: [String]
        },

        content: {
            type: String,
            required: true
        },

        author: {
            type: String,
            // required:true
        },

        organizerName:
        {
            type: String,
            // required: true
        },

        eventDate:{
            type:Date
        }
    },
    {
        timestamps: true,
    }
);

const RealWeddingsModel = mongoose.model<IRealWeddings>("RealWeddings",RealWeddingsSchema);

export default RealWeddingsModel;