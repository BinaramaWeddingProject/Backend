import mongoose, { Schema } from "mongoose";
import { isEmail } from "validator"; // Import isEmail function from validator
import bcrypt from "bcrypt";
const UserSchema = new Schema({
    fullName: {
        type: String,
        required: [true, "Please provide name"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please enter email"],
        validate: [isEmail, "Invalid email address"], // Use isEmail function for email validation
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    phone: {
        type: String,
        required: [true, "Please provide contact number"],
    },
    events: {
        type: mongoose.Types.ObjectId,
        ref: "Event",
    }
}, {
    timestamps: true,
});
//password encription...
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
//compare the password........
UserSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};
export const User = mongoose.model("User", UserSchema);
