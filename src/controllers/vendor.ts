import { NextFunction, Request, Response } from "express";
import { Vendor , IVendor} from "../models/vendor.js";
import { asyncHandler } from "../utils/asynHandler.js";
import { NewUserRequestBody , ControllerType } from "../types/types.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudniary.js";




//Register vendor 
export const Register = asyncHandler(async(
    req: Request<{}, {}, NewUserRequestBody>,
    res:Response,
    next: NextFunction) =>{

        const {name , email , password , phone , city , type_Of_Business , businessName  } = req.body;
        console.log(name , email , password , phone , city , type_Of_Business , businessName)
        const vendor = await Vendor.create({
            name ,
            email ,
            password ,
            phone ,
            city ,
            type_Of_Business , 
            businessName
            
        });

        if(!vendor){
        throw new ApiError(500, "something went wrong while registering the vendor!!")   
        }

        return res.status(201).json(
            new ApiResponse(200 ,  { vendor} , "vendor regiested successfully" )
        )

})


//login vendor
export const Login = asyncHandler(async(req: Request, res: Response) =>{
    const {email , password} = req.body;

    if(!email || !password){
        throw new ApiError(400, "Email or Passwoerd is missing!!");
       }

    //finding user form data base using id
    const vendor = await Vendor.findOne({email});
    
   if(!vendor){
    throw new ApiError(404 , "Email/User dont exists!!");
   }

   //check  password...

   const  isPasswordValid = await vendor.isPasswordCorrect(password);

   if(!isPasswordValid){
    throw new ApiError(401, "Invalid user credentials");
   }
   
   const loggedInVendor = await Vendor.findById(vendor._id).select(
    "-password"
  );

  return res.status(200).json(
    new ApiResponse(200 , {loggedInVendor} ,"here is the vendor")
  )
})

//update details of the vendor...
export const UpdateVendor = asyncHandler(async(req: Request, res: Response) => {
    const { id } = req.params; 

    const updateFields: Partial<IVendor> = req.body;

    const imageUrls = await uploadOnCloudinary(req.files);
   
    const vendor = await Vendor.findById(id);
     
    if(!vendor){
        throw new ApiError(404 , "No Vendor Found!!!");
    }
      

    // Update all fields present in req.body
    for (const [key, value] of Object.entries(updateFields)) {
        if (key !== '_id' && key !== '__v') {
            (vendor as any)[key] = value;
        }
    }
    if(imageUrls) vendor.portfolio = imageUrls

    await vendor.save();
    return res.status(200).json(new ApiResponse(200 , "Vendor Updated Successfully!!"));
});


//Get Vendor By ID
export const GetVendorById = asyncHandler(async(req: Request, res: Response) => {
    const { id } = req.params; 
   
    const vendor = await Vendor.findById(id);
     
    if(!vendor){
        throw new ApiError(404 , "No Vendor Found!!!");
    }

    return res.status(200).json(new ApiResponse(200 , {vendor} , "Here is the Vendor"));
});


//Delete Vendor bY ID
export const DeleteVendorById = asyncHandler(async(req: Request, res: Response) => {
    const { id } = req.params; 

    const vendor = await Vendor.findById(id);
     
    if(!vendor){
        throw new ApiError(404 , "No Vendor Found!!!");
    }

   
    const respose = await Vendor.findByIdAndDelete(id);

    return res.status(200).json(new ApiResponse(200 , {respose} , "Vendor Deleted Successfully "));
});

//getall vendors

export const ShowAllVendors = asyncHandler(async(req: Request, res: Response) =>{
    const vendors = await Vendor.find();

    if(!vendors || vendors.length === 0){
        throw new ApiError(404 , "No vendors in DB");
    }

    return res.status(200).json(
        new ApiResponse(200 , {vendors} , "here are all vendors.")
    )
})

// search by the city
export const searchVendorsByCity = async (req: Request, res: Response) => {
    const { city } = req.params; // Get the city query parameter from the request
  
    try {
      let vendors;
  
      // Check if the city parameter exists
      if (city && typeof city === "string") {
        // Query the Vendor collection for vendors with the specified city
        vendors = await Vendor.find({ city: city });
      } else {
        // If city parameter is not provided or is not a string, return an error
        return res.status(400).json({ message: "City parameter is required and must be a string" });
      }
  
      // If no vendors are found, return an empty array
      if (!vendors || vendors.length === 0) {
        return res.status(404).json({ message: "No vendors found for the specified city" });
      }
  
      // If vendors are found, return them in the response
      return res.status(200).json({ vendors });
    } catch (error) {
      // If an error occurs during the database query, return a 500 error
      return res.status(500).json({ message: "Internal server error" });
    }
  };
//

