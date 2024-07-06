import { Request, Response } from 'express';
import { Enquiry } from '../models/enquiry.js';

export const submitEnquiryForm = async (req: Request, res: Response): Promise<void> => {
  try {
    const newEnquiry= new Enquiry(req.body);
    console.log("xasx" , newEnquiry)
    await newEnquiry.save();
    res.status(201).json({ message: 'Form submitted successfully', data: newEnquiry });
  } catch (error) {
    res.status(400).json({ message: 'Error submitting form', error });
  }
};