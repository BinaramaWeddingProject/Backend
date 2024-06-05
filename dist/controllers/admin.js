import { asyncHandler } from '../utils/asynHandler.js';
import { Vendor } from '../models/vendor.js';
import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { Venue } from '../models/venue.js';
//VENDORS
// Function to get all vendors
export const getAllVendors = asyncHandler(async (req, res) => {
    const vendors = await Vendor.find();
    if (!vendors || vendors.length === 0)
        throw new ApiError(404, "no vendor found in db");
    return res.status(200).json(new ApiResponse(200, vendors, "here are all vendors"));
});
// Function to delete vendor by ID
export const deleteVendorById = async (req, res) => {
    try {
        const deletedVendor = await Vendor.findByIdAndDelete(req.params.id);
        if (deletedVendor) {
            res.status(200).json({ message: 'Vendor deleted successfully' });
        }
        else {
            res.status(404).json({ message: 'Vendor not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Function to get all venue
export const getAllVenues = async (req, res) => {
    try {
        const vendors = await Venue.find();
        res.status(200).json(vendors);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Function to delete venue by ID
export const deleteVenueById = async (req, res) => {
    try {
        const deletedVendor = await Venue.findByIdAndDelete(req.params.id);
        if (deletedVendor) {
            res.status(200).json({ message: 'Vendor deleted successfully' });
        }
        else {
            res.status(404).json({ message: 'Vendor not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// // Function to get all Users
// export const getAllUsers = async (req: Request, res: Response) => {
//   try {
//     const vendors = await User.find();
//     res.status(200).json(vendors);
//   } catch (error:any) {
//     res.status(500).json({ message: error.message });
//   }
// };
// // Function to delete User by ID
// export const deleteUserById = async (req: Request, res: Response) => {
//   try {
//     const deletedVendor = await User.findByIdAndDelete(req.params.id);
//     if (deletedVendor) {
//       res.status(200).json({ message: 'Vendor deleted successfully' });
//     } else {
//       res.status(404).json({ message: 'Vendor not found' });
//     }
//   } catch (error:any) {
//     res.status(500).json({ message: error.message });
//   }
// };
// // Function to get all Bookings
// export const getAllBookings = async (req: Request, res: Response) => {
//   try {
//     const vendors = await VenueBooking.find();
//     res.status(200).json(vendors);
//   } catch (error:any) {
//     res.status(500).json({ message: error.message });
//   }
// };
// Function to delete vendor by ID
export const deleteBookingById = async (req, res) => {
    try {
        const deletedVendor = await Vendor.findByIdAndDelete(req.params.id);
        if (deletedVendor) {
            res.status(200).json({ message: 'Vendor deleted successfully' });
        }
        else {
            res.status(404).json({ message: 'Vendor not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
