import {  Request, Response } from "express";
import { asyncHandler } from "../utils/asynHandler.js";
import BlogModel, { IBlog } from "../models/blogs.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { uploadOnCloudinary } from "../utils/cloudniary.js";

//add a new blog 
export const addItemToBloglist = async (req: Request, res: Response) => {
    try {
      const { title, content } = req.body;
      const givenFiles = req.files as Express.Multer.File[];
  
      if (!givenFiles || givenFiles.length === 0) {
        // No files were uploaded
        const blog = await BlogModel.create({
          title,
          content,
          images: [], // Set an empty array for images
        });
        return res.status(201).json(
          new ApiResponse(200, { blog }, "New blog created successfully")
        );
      }
  
      // Files were uploaded
      const imageUrls = await uploadOnCloudinary(givenFiles);
      const blog = await BlogModel.create({
        title,
        content,
        images: imageUrls,
      });
  
      return res.status(201).json(
        new ApiResponse(200, { blog }, "New blog created successfully")
      );
    } catch (error) {
      console.error('Error adding item to bloglist:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

//get blog by id
export const GetBlogById = asyncHandler(async(req: Request,res: Response)=>{
    const {id} = req.params;

    const blog = await BlogModel.findById(id);

    if(!blog){
        throw new ApiError(404, "No Blog Found!!");
    }

    return res.status(200).json(new ApiResponse(200, {blog}, "Here is the Blog"));
});

//delete blog by ID
export const DeleteblogById = asyncHandler(async(req: Request, res: Response) => {
    const { id } = req.params; 

    const blog = await BlogModel.findById(id);
     
    if(!blog){
        throw new ApiError(404 , "No blog Found!!!");
    }

   
    const response = await BlogModel.findByIdAndDelete(id);

    return res.status(200).json(new ApiResponse(200 , {response} , "blog Deleted Successfully "));
});


//update details of the blog
export const UpdateBlog = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
  
    const updateFields: Partial<IBlog> = req.body;
    const givenFiles = req.files as Express.Multer.File[];
  
    const blog = await BlogModel.findById(id);
  
    if (!blog) {
      throw new ApiError(404, "No blog Found!!!");
    }
  
    if (givenFiles?.length > 0) {
      console.log(givenFiles);
      const imageUrls = await uploadOnCloudinary(givenFiles);
      if (imageUrls) blog.images = imageUrls;
    }
  
    // Update all fields present in req.body
    for (const [key, value] of Object.entries(updateFields)) {
      if(value == undefined) continue;
      if (key !== '_id' && key !== '__v' && value != undefined) {
        (blog as any)[key] = value;
      }
    }
  
    await blog.save();
    return res.status(200).json(new ApiResponse(200, "blog Updated Successfully!!"));
  });


  //get all blogs
  export const getAllBlogs = asyncHandler(async(req: Request, res: Response) =>{
    const blog = await BlogModel.find();

    if(!blog || blog.length === 0){
        throw new ApiError(404 , "No blog in DB");
    }

    return res.status(200).json(
        new ApiResponse(200 , {blog}, "here are the blogs.")
    )
})

