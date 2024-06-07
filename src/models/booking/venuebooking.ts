import mongoose, { Schema } from "mongoose";


const VenueBookingSchema = new Schema(
  {
    venueId: { 
        type: Schema.Types.ObjectId,
        ref: "Venue",
        required: [true, "Venue ID is required"]
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
  },
  { timestamps: true }
);

// Pre-save middleware to check venue availability
VenueBookingSchema.pre("save", async function(this, next) {
  const booking = this;

  // Check if the venue is available on the specified date and time
  const existingBooking = await VenueBooking.findOne({
    venueId: booking.venueId,
    bookingDate: booking.bookingDate,
    $or: [
      { startTime: { $lt: booking.startTime }, endTime: { $gt: booking.startTime } },
      { startTime: { $lt: booking.endTime }, endTime: { $gt: booking.endTime } },
      { startTime: { $gte: booking.startTime }, endTime: { $lte: booking.endTime } }
    ]
  });

  if (existingBooking) {
    // Venue is not available
    throw new Error("Venue is not available on the specified date and time");
  }

  // Venue is available, proceed with saving the booking
  next();
});

export const VenueBooking = mongoose.model("VenueBooking", VenueBookingSchema);
