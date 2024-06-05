import mongoose, { Document, Schema } from "mongoose";
import validator from "validator";// Import isEmail function from validator
import bcrypt from "bcrypt";

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  city: string;
  address: string;
  avatar:string;
  events?: mongoose.Types.ObjectId[];
  isPasswordCorrect(password: string | Buffer): Promise<boolean>;
  generateAccessToken(): string;
}

const UserSchema = new Schema<IUser>(
  {
    fullName: {
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
      required: [true, 'password is required']
    },
    phone: {
      type: String,
      required: [true, "Please provide contact number"],
    },
    city:{
        type: String,
        required: [true, "Please provide city"],

    },
    address: {
        type:String,
        
    },
    
    avatar:{
      type: String,
    },

    events: [{
      type: mongoose.Types.ObjectId,
      ref: "Event",
    }]
  },
  {
    timestamps: true,
  }
);

// Password encryption
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare the password
UserSchema.methods.isPasswordCorrect = async function (password: string | Buffer) {
  return await bcrypt.compare(password, this.password);
}






export const User = mongoose.model<IUser>("User", UserSchema);
