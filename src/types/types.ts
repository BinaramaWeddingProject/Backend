import { NextFunction, Request, Response } from "express";

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


// Define your ControllerType type alias
export type ControllerType<T = any> = (
  req: Request<{ id: string }, {}, T>,
  res: Response,
  next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;