import mongoose from "mongoose";

export interface IEnquiry {
    name: string;
    contact: string;
    location: string;
    guests: string;
    date: string;
    address: string;
    message?: string;
    typeOfEvent: string;
  }

const enquirySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    guests: {
      type: String,
      
    },
    date: {
      type: String,
      
    },
    address: {
      type: String,
      
    },
    message: {
      type: String,
    
    },
    typeOfEvent: {
      type: String,
      
    },


  });

export const Enquiry = mongoose.model<IEnquiry>("Enquiry", enquirySchema);
