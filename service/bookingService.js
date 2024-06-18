import bookingModel from "../models/bookingModel.js";
import ApiError from "../exceptions/apiError.js";
import userModel from "../models/userModel.js";
import mailService from "./mailService.js";
import pdfService from "./pdfService.js";

class BookingService {
  async getAllBookings() {
    const bookings = await bookingModel.find();
    return bookings;
  }

  async addBooking(date, hours, room, userId) {
    const checkBookingConflict = async (date, hours, room) => {
      const bookings = await bookingModel.find({ date: date, room: room });
      if (bookings && bookings.length > 0) {
        for (const booking of bookings) {
          for (const hour of hours) {
            if (booking.hours.includes(hour)) {
              return true; // Найдено пересечение
            }
          }
        }
      }
      return false; // Пересечений нет
    };

    const conflict = await checkBookingConflict(date, hours, room);

    if (conflict) {
      throw ApiError.BadRequest(
        "Some of the selected hours are already booked in this room."
      );
    }
    
    const user = await userModel.findById(userId)

    const booking = await bookingModel.create({
      date,
      hours,
      room,
      user: userId,
    });

    const pdfBill = await pdfService.createBill({date, hours, room, firstName: user.firstName, lastName: user.lastName})

    mailService.sendBookingBill(user.email, pdfBill)

    return booking;
  }
}

export default new BookingService();
