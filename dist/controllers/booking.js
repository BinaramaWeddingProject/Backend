// vendorBooking.controller.ts
import { VendorBooking } from '../models/booking/vendorbooking.js';
// Function to create a new vendor booking
export const createVendorBooking = async (req, res) => {
    try {
        const { vendorId, userId, bookingDate, startTime, endTime } = req.body;
        const newBooking = new VendorBooking({ vendorId, userId, bookingDate, startTime, endTime });
        const savedBooking = await newBooking.save();
        res.status(201).json(savedBooking);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Function to delete a vendor booking by ID
export const deleteVendorBookingById = async (req, res) => {
    try {
        const bookingId = req.params.id;
        const deletedBooking = await VendorBooking.findByIdAndDelete(bookingId);
        if (deletedBooking) {
            res.status(200).json({ message: 'Vendor booking deleted successfully' });
        }
        else {
            res.status(404).json({ message: 'Vendor booking not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// venueBooking.controller.ts
import { VenueBooking } from '../models/booking/venuebooking.js';
// Function to create a new venue booking
export const createVenueBooking = async (req, res) => {
    try {
        const { venueId, userId, bookingDate, startTime, endTime } = req.body;
        const newBooking = new VenueBooking({ venueId, userId, bookingDate, startTime, endTime });
        const savedBooking = await newBooking.save();
        res.status(201).json(savedBooking);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Function to delete a venue booking by ID
export const deleteVenueBookingById = async (req, res) => {
    try {
        const bookingId = req.params.id;
        const deletedBooking = await VenueBooking.findByIdAndDelete(bookingId);
        if (deletedBooking) {
            res.status(200).json({ message: 'Venue booking deleted successfully' });
        }
        else {
            res.status(404).json({ message: 'Venue booking not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
