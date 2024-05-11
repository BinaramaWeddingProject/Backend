import mongoose, { Schema, Types } from "mongoose";
import { isEmail } from "validator";
const VenuSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please provide name"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please enter email"],
        validate: [isEmail, "Invalid email address"],
    },
    phone: {
        type: String,
        required: [true, "Please provide contact number"],
    },
    address: {
        type: String,
        required: [true, "Please provide address"],
    },
    city: {
        type: String,
        required: [true, "Please provide your city"],
    },
    state: {
        type: String,
        required: [true, "Please provide your State"],
    },
    guestCapacity: {
        type: String, //it will be a range like 500-700
    },
    images: {
        type: Array,
        required: [true, "Please add images"],
    },
    description: {
        type: String,
    },
    about: {
        type: String,
    },
    howToReach: {
        type: String,
    },
    venue_Expert_Notes: {
        type: String,
    },
    features_Of_Venue: {
        type: String,
    },
    venue_Policies: {
        type: String,
    },
    summary: {
        type: String,
    },
    review: {
        type: Types.ObjectId,
        ref: "Review",
    },
    foodPackages: {
        type: Types.ObjectId,
        ref: "FoodPackage",
    }
}, {
    timestamps: true,
});
export const Venu = mongoose.model("Venu", VenuSchema);
