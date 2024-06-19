import mongoose, { Document, Schema, Types } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
dotenv.config();

export interface IVenue extends Document {
  yourName: string;
  businessName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  comment: string;
  guestCapacity?: string;
  images: string[];
  description?: string;
  about?: string;
  howToReach?: string;
  venueExpertNotes?: string;
  featuresOfVenue?: string;
  venuePolicies?: string;
  summary?: string;
  review?: Types.ObjectId[];
  foodPackages?: string;
  venueType?: string[];
  facilities?: string[];
  isPasswordCorrect(password: string | Buffer): Promise<boolean>;
}

const VenueSchema = new Schema<IVenue>(
  {
    yourName: {
      type: String,
      required: [true, "Please provide name"],
    },
    businessName: {
      type: String,
      required: [true, "Please provide business name"],
    },
    email: {
      type: String,
      required: [true, "Please enter email"],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: (props: any) => `${props.value} is not a valid email address!`,
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    phone: {
      type: String,
      required: [true, "Please provide contact number"],
    },
    address: {
      type: String,
    },
    city: {
      type: String,
      required: [true, "Please provide your city"],
      index: true, // Add index for efficient filtering
    },
    state: {
      type: String,
    },
    comment: {
      type: String,
    },
    guestCapacity: {
      type: String, // it will be a range like 500-700
    },
    images: {
      type: [String],
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
    venueExpertNotes: {
      type: String,
    },
    featuresOfVenue: {
      type: String,
    },
    venuePolicies: {
      type: String,
    },
    summary: {
      type: String,
    },
    review: {
      type: [Types.ObjectId],
      ref: "Review",
    },
    foodPackages: {
      type: String,
    },
    venueType: {
      type: [String],
      // enum: [
      //   "Banquet Halls",
      //   "Wedding Lawns",
      //   "Beachside Venues",
      //   "Garden Venues",
      //   "Rooftop Venues",
      //   // Add more types as needed
      // ],
    },
    facilities: {
      type: [String],
      // required:false,
      // enum: [
      //   "Food provided by venue",
      //   "Alcohol allowed",
      //   "Outside food allowed",
      //   "Music allowed late",
      //   "Valet parking",
      //   "Sea view",
      //   "Catering services",
      //   "Live music",
      //   "City view",
      //   "Open bar",
      //   "AV equipment",
      //   "Free WiFi",
      //   "Swimming pool",
      //   "Spa services",
      //   "Ample parking",
      //   "Air conditioning",
      //   "Private beach",
      //   "Water sports",
      //   "In-house decor",
      //   "DJ services",
      //   // Add more facilities as needed
      // ],
    },
  },
  {
    timestamps: true,
  }
);

// Password encryption
VenueSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare the password
VenueSchema.methods.isPasswordCorrect = async function (password: string | Buffer) {
  return await bcrypt.compare(password, this.password);
}

export const Venue = mongoose.model<IVenue>("Venue", VenueSchema);
