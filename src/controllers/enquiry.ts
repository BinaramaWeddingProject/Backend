import { Request, Response } from 'express';
import { Enquiry , IEnquiry } from '../models/enquiry.js';

export interface IRequest extends Request {
  body: IEnquiry;
  params: {
      id: string;
  };
}


export const submitEnquiryForm = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("rew", req.body)
    const newEnquiry= new Enquiry(req.body);
    console.log("xasx" , newEnquiry)
    await newEnquiry.save();
    res.status(201).json({ message: 'Form submitted successfully', data: newEnquiry });
  } catch (error) {
    res.status(400).json({ message: 'Error submitting form', error });
  }
};

export const allEnquiries = async (req: Request, res: Response): Promise<void> => {
  try {
      const enquiries = await Enquiry.find();
     // console.log(enquiries)
      res.json(enquiries);
  } catch (err) {
    res.status(500).json({ message: 'Error submitting form', err });
  }
};

export const updateReadStatus = async (req: IRequest, res: Response): Promise<void> => {
  try {
      const { id } = req.params;
      // const { isRead } = req.body;
      const enquiry = await Enquiry.findById(id);

      if (!enquiry) {
          res.status(404).json({ error: 'Enquiry not found' });
      } else {
         enquiry.isRead = true
         const updateeq = await enquiry.save()
         console.log(updateeq)
          res.json(updateeq);
      }
  } catch (err) {
    res.status(400).json({ message: 'Error submitting form', err});
  }
};