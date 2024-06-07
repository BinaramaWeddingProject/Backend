import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asynHandler.js";
import { NewUsersRequestBody , ControllerType } from "../types/types.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { IUser, User } from "../models/user.js";
import jwt from 'jsonwebtoken';
import { Vendor } from "../models/vendor.js";
import { uploadOnCloudinary } from "../utils/cloudniary.js";



//Register vendor 
export const Register = asyncHandler(async(
    req: Request<{}, {}, NewUsersRequestBody>,
    res:Response,
    next: NextFunction) =>{

        const {fullName , email , password , phone , city  } = req.body;
      
        const user = await User.create({
            fullName ,
            email ,
            password ,
            phone ,
            city ,
          
            
        });
     
        if(!user){
        throw new ApiError(500, "something went wrong while registering the user!!")   
        }

        return res.status(201).json(
            new ApiResponse(200 ,  { user} , "user regiested successfully" )
        )

})


// Login vendor
export const Login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      throw new ApiError(400, "Email or Password is missing!!");
    }
  
    // Finding vendor from database using email
    const user = await  User.findOne({ email });
  
    if (!user) {
      throw new ApiError(404, "Email/User doesn't exist!!");
    }
  
   // // Check password
  // const isPasswordValid = await vendor.isPasswordCorrect(password);

  const  isPasswordValid = user.password === password
  
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid user credentials");
    }
     // Generate access token
     const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'default_secret_key';
     const accessToken = jwt.sign({ id: user._id }, accessTokenSecret, { expiresIn: '1h' });
  
  
    // Fetch logged-in vendor details excluding password
    const loggedInUser = await User.findById(user._id).select("-password");
  
    // Return response with logged-in vendor details and access token
    return res.status(200)
    .cookie("accesToken" , accessToken, )//put tokens in cookies
    .json(
      new ApiResponse(200, { loggedInUser, accessToken }, "Here is the vendor")
    );
  });
  
  
//Get user By ID
export const GetUserById = asyncHandler(async(req: Request, res: Response) => {
    const { id } = req.params; 
   
    const user = await User.findById(id);
     
    if(!user){
        throw new ApiError(404 , "No user Found!!!");
    }

    return res.status(200).json(new ApiResponse(200 , {user} , "Here is the user"));
});


//Delete User bY ID
export const DeleteUserById = asyncHandler(async(req: Request, res: Response) => {
    const { id } = req.params; 

    const user = await User.findById(id);
     
    if(!user){
        throw new ApiError(404 , "No user Found!!!");
    }

   
    const respose = await Vendor.findByIdAndDelete(id);

    return res.status(200).json(new ApiResponse(200 , {respose} , "User Deleted Successfully "));
});

//getall users

export const ShowAllUsers = asyncHandler(async(req: Request, res: Response) =>{
    const users = await User.find();

    if(!users || users.length === 0){
        throw new ApiError(404 , "No users in DB");
    }

    return res.status(200).json(
        new ApiResponse(200 , {users} , "here are all vendors.")
    )
})

//update details of the user...
export const UpdateUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
  //  console.log("hello",id);
  
    const updateFields: Partial<IUser> = req.body;
    const givenFiles = req.files as Express.Multer.File[];
 
    const user = await User.findById(id);
  
    if (!user) {
      throw new ApiError(404, "No User Found!!!");
    }
  
    if (givenFiles?.length > 0) {
     
      const imageUrls = await uploadOnCloudinary(givenFiles);
     
      if (imageUrls) user.avatar = imageUrls[0];
    }
// Update all fields present in req.body
  for (const [key, value] of Object.entries(updateFields)) {
    if(value == undefined) continue;
    if (key !== '_id' && key !== '__v' && value != undefined) {
      (user as any)[key] = value;
    }
  }

  await user.save();
  return res.status(200).json(new ApiResponse(200, "User Updated Successfully!!"));
});