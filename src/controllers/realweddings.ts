import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { uploadOnCloudinary } from "../utils/cloudniary.js";
import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asynHandler.js";
import RealWeddingsModel, {IRealWeddings} from "../models/realweddings.js";

//add a new wedding post
export const addItemToRealWeddingsPost = async (req: Request, res: Response) => {
    try {
      console.log("post request");
      const { title, content, author, eventDate, organizerName } = req.body;
      
      const givenFiles = req.files as Express.Multer.File[];
  
      if (!givenFiles || givenFiles.length === 0) {
        // No files were uploaded
        const realWeddings = await RealWeddingsModel.create({
          title,
          content,
          author,
          eventDate,
          organizerName,
          images: [], // Set an empty array for images
        });
        return res.status(201).json(
          new ApiResponse(200, { realWeddings }, "New realWeddings created successfully")
        );
      }
  
      // Files were uploaded
      const imageUrls = await uploadOnCloudinary(givenFiles);
      const realWeddings = await RealWeddingsModel.create({
        title,
        content,
        author,
        eventDate,
        organizerName,
        images: imageUrls,
      });
  
      return res.status(201).json(
        new ApiResponse(200, { realWeddings }, "New realWeddings created successfully")
      );
    } catch (error) {
      console.error('Error adding item to RealWeddingsList:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  //get wedding Post by ID
export const GetRealWeddingsPostById = asyncHandler(async(req: Request,res: Response)=>{
  const {id} = req.params;

  const realWeddings = await RealWeddingsModel.findById(id);

  if(!realWeddings){
      throw new ApiError(404, "No realWeddings Found!!");
  }

  return res.status(200).json(new ApiResponse(200, {realWeddings}, "Here is the realWeddings"));
});

//delete wedding Post by ID
export const DeleteRealWeddingsById = asyncHandler(async(req: Request, res: Response) => {
  const { id } = req.params; 

  const realWeddings = await RealWeddingsModel.findById(id);
   
  if(!realWeddings){
      throw new ApiError(404 , "No realWeddings Found!!!");
  }

 
  const response = await RealWeddingsModel.findByIdAndDelete(id);

  return res.status(200).json(new ApiResponse(200 , {response} , "realWeddings Deleted Successfully "));
});


//update details of the weddings Post
export const UpdateRealWeddingsPost = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const updateFields: Partial<IRealWeddings> = req.body;
  const givenFiles = req.files as Express.Multer.File[];
  console.log("file" , givenFiles);

  const realWeddings = await RealWeddingsModel.findById(id);

  if (!realWeddings) {
    throw new ApiError(404, "No realWeddings Found!!!");
  }

  if (givenFiles?.length > 0) {
    console.log(givenFiles);
    const imageUrls = await uploadOnCloudinary(givenFiles);
    if (imageUrls) realWeddings.images = imageUrls;
  }

  // Update all fields present in req.body
  for (const [key, value] of Object.entries(updateFields)) {
    if(value == undefined) continue;
    if (key !== '_id' && key !== '__v' && value != undefined) {
      (realWeddings as any)[key] = value;
    }
  }

  await realWeddings.save();
  return res.status(200).json(new ApiResponse(200, "realWeddings Updated Successfully!!"));
});

  //get all weddings Post
  export const getAllRealWeddings = asyncHandler(async(req: Request, res: Response) =>{
    const realWeddings = await RealWeddingsModel.find();

    if(!realWeddings || realWeddings.length === 0){
        throw new ApiError(404 , "No realWeddings in DB");
    }

    return res.status(200).json(
        new ApiResponse(200 , {realWeddings}, "here are the realWeddings.")
    )
})


