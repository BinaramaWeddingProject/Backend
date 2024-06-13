import mongoose, { Schema } from "mongoose";
const VendorBookingSchema = new Schema({
    vendorId: {
        type: Schema.Types.ObjectId,
        ref: "Vendor",
        required: [true, "Vendor ID is required"]
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"]
    },
    bookingDate: {
        type: Date,
        required: [true, "Booking date is required"]
    },
    startTime: {
        type: String,
        required: [true, "Start time is required"]
    },
    endTime: {
        type: String,
        required: [true, "End time is required"]
    }
}, { timestamps: true });
// Pre-save middleware to check vendor availability
VendorBookingSchema.pre("save", async function (next) {
    const booking = this;
    // Check if the vendor is available on the specified date and time
    const existingBooking = await VendorBooking.findOne({
        vendorId: booking.vendorId,
        bookingDate: booking.bookingDate,
        $or: [
            { startTime: { $lt: booking.startTime }, endTime: { $gt: booking.startTime } },
            { startTime: { $lt: booking.endTime }, endTime: { $gt: booking.endTime } },
            { startTime: { $gte: booking.startTime }, endTime: { $lte: booking.endTime } }
        ]
    });
    if (existingBooking) {
        // Vendor is not available
        throw new Error("Vendor is not available on the specified date and time");
    }
    // Vendor is available, proceed with saving the booking
    next();
});
export const VendorBooking = mongoose.model("VendorBooking", VendorBookingSchema);
