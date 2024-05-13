import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
const VendorSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please provide name"],
    },
    email: {
        type: String,
        required: [true, "Please enter email"],
        unique: true,
        trim: true, // Trim whitespace from input
        lowercase: true, // Convert email to lowercase
        validate: {
            validator: (value) => validator.isEmail(value),
            message: (props) => `${props.value} is not a valid email address!`,
        },
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    phone: {
        type: String,
        required: [true, "Please provide contact number"],
    },
    address: {
        type: String,
        //  required: [true, "Please provide address"],
    },
    city: {
        type: String,
        required: [true, "Please provide your city"],
    },
    state: {
        type: String,
        //required: [true, "Please provide your State"],
    },
    businessName: {
        type: String,
        //required: [true, "Please provide your   Business Name"],
    },
    type_Of_Business: {
        type: String,
        // required: [true, "Please provide your Type of Business"],
    },
    packages: {
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
        required: false,
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
//password encription...
VendorSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
//compare the password........
VendorSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};
export const Vendor = mongoose.model("Vendor", VendorSchema);
