import express from 'express';
import { createBooking, getBookingById, updateBookingVerification, deleteBooking, getAllBookings } from '../controllers/booking.js';
const router = express.Router();
router.post('/bookings', createBooking);
router.get('/bookings', getAllBookings);
router.get('/:vId', getBookingById);
router.patch('/:vId', updateBookingVerification);
router.delete('/:id', deleteBooking);
export default router;
