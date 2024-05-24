// import mongoose, { Document, Schema } from "mongoose";
// import { isEmail } from "validator"; // Import isEmail function from validator
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
export {};
// export interface IUser extends Document {
//   fullName: string;
//   email: string;
//   password: string;
//   phone: string;
//   events?: mongoose.Types.ObjectId[];
//   isPasswordCorrect(password: string | Buffer): Promise<boolean>;
//   generateAccessToken(): string;
// }
// const UserSchema = new Schema<IUser>(
//   {
//     fullName: {
//       type: String,
//       required: [true, "Please provide name"],
//     },
//     email: {
//       type: String,
//       unique: true,
//       required: [true, "Please enter email"],
//       validate: [isEmail, "Invalid email address"], // Use isEmail function for email validation
//     },
//     password: {
//       type: String,
//       required: [true, 'password is required']
//     },
//     phone: {
//       type: String,
//       required: [true, "Please provide contact number"],
//     },
//     events: [{
//       type: mongoose.Types.ObjectId,
//       ref: "Event",
//     }]
//   },
//   {
//     timestamps: true,
//   }
// );
// // Password encryption
// UserSchema.pre<IUser>("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });
// // Compare the password
// UserSchema.methods.isPasswordCorrect = async function (password: string | Buffer) {
//   return await bcrypt.compare(password, this.password);
// }
// // Generate access token
// UserSchema.methods.generateAccessToken = function () {
//   return jwt.sign(
//     {
//       _id: this._id,
//     },
//     process.env.ACCESS_TOKEN_SECRET as string,
//     {
//       expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
//     }
//   );
// }
// //refresh token expiry......
// UserSchema.methods.generateRefreshToken = function(){
//   return jwt.sign(
//       {
//           _id: this._id,
//       },
//       process.env.REFRESH_TOKEN_SECRET,
//       {
//           expiresIn: process.env.REFRESH_TOKEN_EXPIRY
//       }
//   )
// }
// export const User = mongoose.model<IUser>("User", UserSchema);
