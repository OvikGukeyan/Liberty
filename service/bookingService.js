import bookingModel from "../models/bookingModel.js";
import ApiError from "../exceptions/apiError.js";

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

    const booking = await bookingModel.create({ date, hours, room, user: userId });
    return booking;
  }
}

export default new BookingService();