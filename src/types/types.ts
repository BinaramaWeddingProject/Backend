import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";

export interface NewUserRequestBody {
    name: string;
    email: string;
    password:string;
    phone: string;
    address: string;
    city: string;
    state: string;
    businessName:string;
    type_Of_Business:string;
    package: {
      name: string;
      days: string;
      price: string;
      minAdvance: string;
    };
    portfolio: Array<string>; 
    experience?: string;
    event_completed?: number;
    willingToTravel?: boolean;
    usp?: string;
    summary?: string;
    bookingPolicy?: string;
    cancellationPolicy?: string;
    termAndConditions?: string;
   
}

export interface NewVenueRequestBody{
  
  name: string;
  businessName:string;
  yourName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  comments:string;
  guestCapacity?: string;
  images: string[];
  description?: string;
  about?: string;
  howToReach?: string;
  venueExpertNotes?: string;
  featuresOfVenue?: string;
  venuePolicies?: string;
  summary?: string;
  review?: Types.ObjectId;
  venueType?:string[];
  facilities?:string[];
  foodPackages?:string

}

export interface NewUsersRequestBody {
  fullName: string;
  email: string;
  password:string;
  phone: string;
  city: string;
  
 
}



// Define your ControllerType type alias
export type ControllerType<T = any> = (
  req: Request<{ id: string }, {}, T>,
  res: Response,
  next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;




export interface RequestWithFiles extends Request {
  files: Express.Multer.File[];
}

export interface RequestWithMulterFiles extends Request {
  files: Express.Multer.File[];
}