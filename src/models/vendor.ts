import mongoose, { Document, Schema  } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt"

export interface IVendor extends Document {
  name: string;
  email: string;
  password:string;
  phone: string;
  address: string;
  city: string;
  state: string;
  businessName:string;
  type_Of_Business:string;
  packages: {
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
  review?: mongoose.Types.ObjectId;
  isPasswordCorrect(password: string | Buffer): Promise<boolean>;
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
        trim: true, // Trim whitespace from input
        lowercase: true, // Convert email to lowercase
        validate: {
            validator: (value: string) => validator.isEmail(value),
            message: (props: any) => `${props.value} is not a valid email address!`,
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

    businessName:{
      type: String,
      //required: [true, "Please provide your   Business Name"],
    },
    type_Of_Business:{

      type: String,
     // required: [true, "Please provide your Type of Business"],

    },

    packages: {
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
  },
  {
    timestamps: true,
  }
);



//password encription...

VendorSchema.pre("save" , async function (next){
  if(!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password , 10)
  next()

})

//compare the password........
VendorSchema.methods.isPasswordCorrect = async function(password: string | Buffer){
  return await bcrypt.compare(password, this.password)
}


export const Vendor = mongoose.model<IVendor>("Vendor", VendorSchema);
