import { Request, Response } from 'express';  // Adjust the import path as necessary
import { Booking } from '../models/booking/booking.js';

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { vId, uId, name, contact, location, guests, date, address, message } = req.body;

    // Check if there is already a booking with the same uId and vId
    const existingBooking = await Booking.findOne({ uId, vId });

    if (existingBooking) {
      // Return a response indicating that a booking already exists for this uId and vId
      return res.status(400).json({ error: 'Booking already exists for this uId and vId' });
    }

    // Generate a unique ID for the booking
    const uniqueId = Math.floor(100000 + Math.random() * 900000);

    // Construct the new booking object
    const newBooking = new Booking({
      vId,
      uId,
      name,
      contact,
      location,
      guests,
      date,
      address,
      message,
      bookingId: uniqueId
    });

    // Save the new booking
    const savedBooking = await newBooking.save();

    return res.status(201).json(savedBooking);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};




// Get all bookings
export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.find();
    return res.status(200).json(bookings);
  } catch (error:any) {
    return res.status(500).json({ error: error.message });
  }
};



export const getBookingById = async (req: Request, res: Response) => {
  try {
    const vId = req.params.vId;
    const {bookingId,uId} = req.body
     // Correctly extract vId from request parameters

    // Find the booking by vId
    const booking = await Booking.findOne({ vId,uId });

    return

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    return res.status(200).json(booking);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};


// Update a booking by ID
export const updateBookingVerification = async (req: Request, res: Response) => {
  try {
    const vId = req.params.vId; // Correctly extract venueId from request parameters
    const { uId, bookingId } = req.body;
    console.log("pathc req log",vId,uId,bookingId)

    // Find the booking by matching vId with vId
    const booking = await Booking.findOne({ vId: vId, uId: uId });

    console.log("dataa", booking);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found for this venueId' });
    }

    if(booking.bookingId==bookingId){
      
      booking.isVerified="Approved";
      
      console.log("status kya h",booking.isVerified)

      const updateBooking = await booking.save();
      
      
      return res.status(200).json(updateBooking.isVerified);

    }
    else if(bookingId==="Rejected"){
      booking.isVerified="Rejected"
      return res.status(500).json("The request has been rejected")
    }
    else if(booking.bookingId!=bookingId){
      return res.status(500).json("Code not valid")

    }

  else{
    booking.isVerified="Pending"
    return res.status(500).json("Request still in Pending State")
  }


  } catch (error:any) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete a booking by ID
export const deleteBooking = async (req: Request, res: Response) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
    if (!deletedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    return res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error:any) {
    return res.status(500).json({ error: error.message });
  }
};
