import mongoose, { Document, Schema } from "mongoose";
import { isEmail } from "validator"; // Import isEmail function from validator

export interface IVendor extends Document {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  package: {
    name: string;
    days: string;
    price: string;
    minAdvance: string;
  };
  portfolio: Array<string>; // Specify the type of elements in the array
  experience?: string;
  event_completed?: number;
  willingToTravel?: boolean;
  usp?: string;
  summary?: string;
  bookingPolicy?: string;
  cancellationPolicy?: string;
  termAndConditions?: string;
  review?: mongoose.Types.ObjectId; // Use mongoose.Types.ObjectId instead of Types.ObjectId
}

const VendorSchema = new Schema<IVendor>(
  {
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
      name: {  // package name
        type: String,
      },
      days: {
        type: String,
      },
      price: {
        type: String,
      },
      minAdvance: {  // to book the vendor
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
  },
  {
    timestamps: true,
  }
);

export const Vendor = mongoose.model<IVendor>("Vendor", VendorSchema);
