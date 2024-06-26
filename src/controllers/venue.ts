import { NextFunction, Request, Response } from "express";

import { asyncHandler } from "../utils/asynHandler.js";
import { NewVenueRequestBody , ControllerType } from "../types/types.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudniary.js";
import { Venue , IVenue} from "../models/venue.js";
import jwt from 'jsonwebtoken';


//Register Venu
export const Register = asyncHandler(async(
    req: Request<{}, {}, NewVenueRequestBody>,
    res:Response,
    next: NextFunction) =>{

        const {businessName ,yourName,  email , password , phone , city , comments  } = req.body;
        console.log(businessName ,yourName,  email , password , phone , city , comments)

        const venue = await Venue.create({
            businessName ,yourName,  email , password , phone , city , comments
            
        });

  
        if(!venue){
        throw new ApiError(500, "something went wrong while registering the vendor!!")   
        }
        

        return res.status(201).json(
            new ApiResponse(200 ,  { venue } , "vendor regiested successfully" )
        )

})



// Login vendor
export const Login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      throw new ApiError(400, "Email or Password is missing!!");
    }
  
    // Finding vendor from database using email
    const venue = await  Venue.findOne({ email });
  
    if (!venue) {
      throw new ApiError(404, "Email/User doesn't exist!!");
    }
  
    // // Check password
  // const isPasswordValid = await vendor.isPasswordCorrect(password);

 const  isPasswordValid = venue.password === password
  
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid venue credentials");
    }


     // Generate access token
     const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'default_secret_key';
     const accessToken = jwt.sign({ id: venue._id }, accessTokenSecret, { expiresIn: '1h' });



  
    // Fetch logged-in vendor details excluding password
    const loggedInVenue = await Venue.findById(venue._id).select("-password");
  
    // Return response with logged-in vendor details and access token
    return res.status(200)
    .cookie("accesToken" , accessToken, )//put tokens in cookies
    .json(
      new ApiResponse(200, { loggedInVenue , accessToken}, "Here is the vendor")
    );
  });




  //Get Venue By ID
export const GetVenueById = asyncHandler(async(req: Request, res: Response) => {
    const { id } = req.params; 
   
    const venue = await Venue.findById(id);
     
    if(!venue){
        throw new ApiError(404 , "No Vendor Found!!!");
    }

    return res.status(200).json(new ApiResponse(200 , {venue} , "Here is the Vendor"));
});

//update Venue
export const UpdateVenue = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const updateFields: Partial<IVenue> = req.body;
  
  const givenFiles = req.files as Express.Multer.File[];
  
  const venue = await Venue.findById(id);
  
  if (!venue) {
    throw new ApiError(404, "No Venue Found!!!");
  }

  if (givenFiles?.length > 0) {
    console.log(givenFiles);
    const imageUrls = await uploadOnCloudinary(givenFiles);
    if (imageUrls) venue.images = imageUrls;
  }

  // Update all fields present in req.body
  for (const [key, value] of Object.entries(updateFields)) {
    if (key !== '_id' && key !== '__v') {
      (venue as any)[key] = value;
    
    }
  }
 
  await venue.save();
  return res.status(200).json(new ApiResponse(200, "Venue Updated Successfully!!"));
});


  
//Delete venue bY ID
export const DeleteVenueById = asyncHandler(async(req: Request, res: Response) => {
    const { id } = req.params; 

    const venue = await Venue.findById(id);
     
    if(!venue){
        throw new ApiError(404 , "No Vendor Found!!!");
    }

   
    const respose = await Venue.findByIdAndDelete(id);

    return res.status(200).json(new ApiResponse(200 , {respose} , "Vendor Deleted Successfully "));
});



// Function to get all venues with optional filters
export const ShowAllVenues = asyncHandler(async (req: Request, res: Response) => {
  const { city, guestCapacity } = req.query;
 console.log(city , guestCapacity)
  // Build the filter object
  const filter: any = {};
  if (city) {
    filter.city = city;
  }
  if (guestCapacity) {
    filter.guestCapacity = guestCapacity;
  }

  const venues = await Venue.find(filter);

  if (!venues || venues.length === 0) {
    throw new ApiError(404, "No vendors in DB");
  } 

  return res.status(200).json(
    new ApiResponse(200, { venues }, "Here are all vendors.")
  );
});


// Function to get all venues with optional filters
export const filterVenues = async (req: Request, res: Response) => {
  try {
    console.log("yerooo data", filterVenues)
    // Extract filter criteria from query parameters
    const { businessName ,city, minGuests, maxGuests, foodPackage, facilities, venueTypes } = req.query;
    console.log(businessName , city, minGuests, maxGuests, foodPackage, facilities, venueTypes)
    // Build the filter criteria object
    const filterCriteria: any = {};
    var venues;

    

    if (city) {
      filterCriteria.city = city;
    }
    if (businessName) {
      filterCriteria.businessName = businessName;
    }

    if (minGuests || maxGuests) {
      filterCriteria.guestCapacity = {};
      if (minGuests) filterCriteria.guestCapacity.$gte = Number(minGuests);
      if (maxGuests) filterCriteria.guestCapacity.$lte = Number(maxGuests);
    }

    if (foodPackage) {
      filterCriteria.foodPackages = foodPackage;
    }

    if (facilities) {
      filterCriteria.facilities = { $all: (facilities as string).split(',') };
    }

    if (venueTypes) {
      filterCriteria.venueType = { $in: (venueTypes as string).split(',') };
    }

   // console.log(filterCriteria)
    // Perform the query
    
       
  //  if(filterCriteria){
  //    venues = await Venue.find(filterCriteria);
  //  }
  //  else{
  //   venues = await Venue.find();
  //  }
  if(!businessName && !city && !minGuests && !maxGuests && !foodPackage && !facilities && !venueTypes){
  venues = await Venue.find();
  }

    //console.log(venues)

    // Return the filtered venues
    res.status(200).json({
      success: true,
      data: venues
    });
  } catch (error:any) {
    console.error('Error fetching venues:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching venues',
      error: error.message
    });
  }
};





// search by the city
export const searchvenuesByCity = async (req: Request, res: Response) => {
    const { city } = req.params; // Get the city query parameter from the request
  
    try {
      let venues;
  
      // Check if the city parameter exists
      if (city && typeof city === "string") {
        // Query the Vendor collection for vendors with the specified city
        venues = await Venue.find({ city: city });
      } else {
        // If city parameter is not provided or is not a string, return an error
        return res.status(400).json({ message: "City parameter is required and must be a string" });
      }
  
      // If no vendors are found, return an empty array
      if (!venues || venues.length === 0) {
        return res.status(404).json({ message: "No venues found for the specified city" });
      }
  
      // If vendors are found, return them in the response
      return res.status(200).json({ venues });
    } catch (error) {
      // If an error occurs during the database query, return a 500 error
      return res.status(500).json({ message: "Internal server error" });
    }
  };



  // //Get Ranked venues
  // export const topVenues = asyncHandler(async (req: Request, res: Response) => {
  //   // Inside this function, we assume Venue is a Mongoose model
  //   const venues = await Venue.find({rank:{1:5}});
    
  //   // Return a JSON response with a custom API response format
  //   return res.status(200).json(new ApiResponse(200, { venues }, "Here are the Vendors by rank"));
  // });
  

// Assuming Venue is a Mongoose model and asyncHandler is used for error handling
export const topVenues = asyncHandler(async (req: Request, res: Response) => {
  // Query to find venues where rank is between 1 and 5
  const venues = await Venue.find({ rank: { $gte: 1, $lte: 2 } });

  // Return a JSON response with a custom API response format
  return res.status(200).json(new ApiResponse(200, { venues }, "Here are the Vendors by rank"));
});
