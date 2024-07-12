import bookingService from "../service/bookingService.js";
import { validationResult } from "express-validator";
import ApiError from "../exceptions/apiError.js";


class BookingController {

    async addBooking (req, res, next) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', errors.array()))
            }
            const bookingData = await bookingService.addBookings(req.body);
            return res.json(bookingData);
        } catch (error) {
            next(error)
        }
    }

    async getBookings (req, res, next) {
        try {
            const bookings = await bookingService.getAllBookings();
            return res.json(bookings)
        } catch (error) {
            next(error)
        }
    }
}

export default new BookingController;