import mongoose, { Document, Schema, Types } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
dotenv.config();

// Define the structure of the venue
export interface IVenue extends Document {
   yourName: string;
   businessName:string;
  email: string;
  password:string;
  phone: string;
  address: string;
  city: string;
  state: string;
  comment:string;
  guestCapacity?: string;
  images: string[];
  description?: string;
  about?: string;
  howToReach?: string;
  venueExpertNotes?: string;
  featuresOfVenue?: string;
  isVerified?: 'Approved' | 'Rejected' | 'Pending';
  venuePolicies?: string;
  summary?: string;
  review?: Types.ObjectId;
  foodPackages?: Types.ObjectId;
  isPasswordCorrect(password: string | Buffer): Promise<boolean>;
}

const VenueSchema = new Schema<IVenue>(
  {
    yourName: {
      type: String,
      required: [true, "Please provide name"],
    },
    businessName:{
        type: String,
      required: [true, "Please provide businessname"],

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
        required: [true, 'password is required'],
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
   //   required: [true, "Please provide your State"],
    },
    comment:{
        type: String,
      
    },
    isVerified: {
      type: String, 
      enum: ['Approved' , 'Rejected' , 'Pending'],
      default: 'Pending',
    },

    guestCapacity: {
      type: String, // it will be a range like 500-700
    },
    images: {
      type: [String],
    //  required: [true, "Please add images"],
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
      type: Types.ObjectId,
      ref: "Review",
    },
    foodPackages: {
      type: Types.ObjectId,
      ref: "FoodPackage",
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
