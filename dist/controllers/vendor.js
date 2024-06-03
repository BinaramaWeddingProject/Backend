import { Vendor } from "../models/vendor.js";
import { asyncHandler } from "../utils/asynHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudniary.js";
import jwt from 'jsonwebtoken';
export const generateAccessAndRefreshTokens = async (vendorId) => {
    try {
        const vendor = await Vendor.findById(vendorId);
        if (!vendor) {
            throw new Error("Vendor not found");
        }
        const accessToken = vendor.generateAccessToken();
        const refreshToken = vendor.generateRefreshToken();
        // Attach refresh token to the vendor document
        vendor.refreshToken = refreshToken;
        // Save the vendor with validateBeforeSave set to false
        await vendor.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    }
    catch (error) {
        throw new Error("Something went wrong while generating the access token");
    }
};
//Register vendor 
export const Register = asyncHandler(async (req, res, next) => {
    const { name, email, password, phone, city, type_Of_Business, businessName } = req.body;
    // console.log(name , email , password , phone , city , type_Of_Business , businessName)
    const vendor = await Vendor.create({
        name,
        email,
        password,
        phone,
        city,
        type_Of_Business,
        businessName
    });
    if (!vendor) {
        throw new ApiError(500, "something went wrong while registering the vendor!!");
    }
    return res.status(201).json(new ApiResponse(200, { vendor }, "vendor regiested successfully"));
});
// Login vendor
export const Login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ApiError(400, "Email or Password is missing!!");
    }
    // Finding vendor from database using email
    const vendor = await Vendor.findOne({ email });
    if (!vendor) {
        throw new ApiError(404, "Email/User doesn't exist!!");
    }
    // Check password
    const isPasswordValid = await vendor.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials");
    }
    // Generate access token
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'default_secret_key';
    const accessToken = jwt.sign({ id: vendor._id }, accessTokenSecret, { expiresIn: '1h' });
    // Fetch logged-in vendor details excluding password
    const loggedInVendor = await Vendor.findById(vendor._id).select("-password");
    // Return response with logged-in vendor details and access token
    return res.status(200)
        .cookie("accesToken", accessToken) //put tokens in cookies
        .json(new ApiResponse(200, { loggedInVendor, accessToken }, "Here is the vendor"));
});
//update details of the vendor...
export const UpdateVendor = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updateFields = req.body;
    const givenFiles = req.files;
    const vendor = await Vendor.findById(id);
    if (!vendor) {
        throw new ApiError(404, "No Vendor Found!!!");
    }
    if (givenFiles?.length > 0) {
        console.log(givenFiles);
        const imageUrls = await uploadOnCloudinary(givenFiles);
        if (imageUrls)
            vendor.portfolio = imageUrls;
    }
    // Update all fields present in req.body
    for (const [key, value] of Object.entries(updateFields)) {
        if (value == undefined)
            continue;
        if (key !== '_id' && key !== '__v' && value != undefined) {
            vendor[key] = value;
        }
    }
    await vendor.save();
    return res.status(200).json(new ApiResponse(200, "Vendor Updated Successfully!!"));
});
//Get Vendor By ID
export const GetVendorById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const vendor = await Vendor.findById(id);
    if (!vendor) {
        throw new ApiError(404, "No Vendor Found!!!");
    }
    return res.status(200).json(new ApiResponse(200, { vendor }, "Here is the Vendor"));
});
//Delete Vendor bY ID
export const DeleteVendorById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const vendor = await Vendor.findById(id);
    if (!vendor) {
        throw new ApiError(404, "No Vendor Found!!!");
    }
    const respose = await Vendor.findByIdAndDelete(id);
    return res.status(200).json(new ApiResponse(200, { respose }, "Vendor Deleted Successfully "));
});
//getall vendors
export const ShowAllVendors = asyncHandler(async (req, res) => {
    const vendors = await Vendor.find();
    if (!vendors || vendors.length === 0) {
        throw new ApiError(404, "No vendors in DB");
    }
    return res.status(200).json(new ApiResponse(200, { vendors }, "here are all vendors."));
});
// search by the city
export const searchVendorsByCity = async (req, res) => {
    const { city } = req.params; // Get the city query parameter from the request
    try {
        let vendors;
        // Check if the city parameter exists
        if (city && typeof city === "string") {
            // Query the Vendor collection for vendors with the specified city
            vendors = await Vendor.find({ city: city });
        }
        else {
            // If city parameter is not provided or is not a string, return an error
            return res.status(400).json({ message: "City parameter is required and must be a string" });
        }
        // If no vendors are found, return an empty array
        if (!vendors || vendors.length === 0) {
            return res.status(404).json({ message: "No vendors found for the specified city" });
        }
        // If vendors are found, return them in the response
        return res.status(200).json({ vendors });
    }
    catch (error) {
        // If an error occurs during the database query, return a 500 error
        return res.status(500).json({ message: "Internal server error" });
    }
};
//
//Get vendor type
export const GetVendorByType = asyncHandler(async (req, res) => {
    console.log("pass1");
    const type = req.params.type_Of_Business;
    console.log(req.params);
    console.log("pass2", type);
    // Find vendors based on the type_Of_Business field
    const vendors = await Vendor.find({ type_Of_Business: type });
    console.log("pass3", vendors);
    // Check if vendors were found
    if (!vendors || vendors.length === 0) {
        // Handle case where no vendors were found for the given type
        throw new ApiError(404, "No Vendors Found!!!");
    }
    // Return the found vendors
    return res.status(200).json(new ApiResponse(200, { vendors }, "Here are the Vendors by type"));
});
