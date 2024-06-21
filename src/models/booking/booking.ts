import mongoose, { Document, Schema } from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

// Define the structure of the bookings
export interface IBooking extends Document {
  uId?: string;
  vId?: string;
  name?: string;
  contact?: number;
  location?: string;
  guests?: string;
  date?: Date;
  address?: string;
  message?: string;
  bookingId?: string;   
  isVerified?: 'Approved' | 'Rejected' | 'Pending';
}

// Define the Booking Schema
const BookingSchema = new Schema<IBooking>({
  vId: { type: String, required: true },
  uId: { type: String, required: true },
  name: { type: String, required: true },
  contact: { type: Number, required: true },
  location: { type: String, required: true },
  guests: { type: String, required: true },
  date: { type: Date, required: true },
  address: { type: String, required: true },
  message: { type: String, required: true },
  bookingId: { type: String, required: true },

  isVerified: { type: String, enum: ['Approved', 'Rejected', 'Pending'], default: 'Pending' }
}, {
  timestamps: true // Add timestamps to record creation and update times
});

// Create and export the Booking model
export const Booking = mongoose.model<IBooking>("Booking", BookingSchema);
