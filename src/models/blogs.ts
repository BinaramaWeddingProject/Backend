import mongoose, { Document, Schema } from "mongoose";

export interface IBlog extends Document {
    title?: string;
    images?: string[];
    content?: string;
    author?: string;
    createdAt?: Date;
    category?: string;
}

const blogSchema = new Schema<IBlog>(
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

        category:
        {
            type: String,
            // required: true
        }
    },
    {
        timestamps: true,
    }
);

const blogModel = mongoose.model<IBlog>("Blog",blogSchema);

export default blogModel;