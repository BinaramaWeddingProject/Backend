import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs'
import { ApiError } from './apiError.js';

          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (files:any) => {
    try {
        const imageUrls = [];
        
        for (const file of files) {
            const result = await cloudinary.uploader.upload(file.path);
            imageUrls.push(result.secure_url);
        }
        
        return imageUrls;
    } catch (error) {
        console.error('Error uploading files to Cloudinary:', error);
        throw new ApiError(500, 'Error uploading files to Cloudinary');
    }
};

export { uploadOnCloudinary };