import mongoose, { Document, Schema } from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
dotenv.config();

export interface IVendor extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  businessName: string;
  type_Of_Business: string;
  packages: {
    name: string;
    days: string;
    price: string;
    minAdvance: string;
  };
  portfolio: Array<string>;
  experience?: string;
  event_completed?: number;
  willingToTravel?: boolean;
  isVerified?: 'Approved' | 'Rejected' | 'Pending';
  usp?: string;
  summary?: string;
  bookingPolicy?: string;
  cancellationPolicy?: string;
  termAndConditions?: string;
  review?: mongoose.Types.ObjectId;
  isPasswordCorrect(password: string | Buffer): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
}

const VendorSchema = new Schema<IVendor>(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
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
    },
    city: {
      type: String,
      required: [true, "Please provide your city"],
    },
    state: {
      type: String,
    },
    businessName: {
      type: String,
    },
    type_Of_Business: {
      type: String,
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
      },
    },
    portfolio: {
      type: [String],
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
    isVerified: {
      type: String, 
      enum: ['Approved' , 'Rejected' , 'Pending'],
      default: 'Pending',
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
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);


// Password encryption
VendorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});


// Compare the password
VendorSchema.methods.isPasswordCorrect = async function (password: string | Buffer) {
  return await bcrypt.compare(password, this.password);
}



// // Generate access token
// VendorSchema.methods.generateAccessToken = function (): string {
//   if (!process.env.ACCESS_TOKEN_SECRET || !process.env.ACCESS_TOKEN_EXPIRY) {
//     throw new Error('Missing ACCESS_TOKEN_SECRET or ACCESS_TOKEN_EXPIRY environment variable');
//   }
//   return jwt.sign(
//     {
//       _id: this._id,
//     },
//     process.env.ACCESS_TOKEN_SECRET,
//     {
//       expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
//     }
//   );
// }


// // Generate refresh token
// VendorSchema.methods.generateRefreshToken = function (): string {
//   if (!process.env.REFRESH_TOKEN_SECRET || !process.env.REFRESH_TOKEN_EXPIRY) {
//     throw new Error('Missing REFRESH_TOKEN_SECRET or REFRESH_TOKEN_EXPIRY environment variable');
//   }
//   return jwt.sign(
//     {
//       _id: this._id,
//     },
//     process.env.REFRESH_TOKEN_SECRET,
//     {
//       expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
//     }
//   );
// }



export const Vendor = mongoose.model<IVendor>("Vendor", VendorSchema);
