import mongoose, { Schema } from "mongoose";
import { isEmail } from "validator"; // Import isEmail function from validator
const VendorSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please provide name"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please enter email"],
        validate: [isEmail, "Invalid email address"], // Use isEmail function for email validation
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
    package: {
        name: {
            type: String,
        },
        days: {
            type: String,
        },
        price: {
            type: String,
        },
        minAdvance: {
            type: String,
        }
    },
    portfolio: {
        type: [String], // Specify array of strings
        required: [true, "Please add photo"],
    },
    experience: {
        type: String,
    },
    event_completed: {
        type: Number,
    },
    willingToTravel: {
        type: Boolean,
    },
    usp: {
        type: String,
    },
    summary: {
        type: String,
    },
    bookingPolicy: {
        type: String,
    },
    cancellationPolicy: {
        type: String,
    },
    termAndConditions: {
        type: String,
    },
    review: {
        type: mongoose.Types.ObjectId,
        ref: "Review",
    }
}, {
    timestamps: true,
});
export const Vendor = mongoose.model("Vendor", VendorSchema);
