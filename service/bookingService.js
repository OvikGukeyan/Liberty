import bookingModel from "../models/bookingModel.js";
import ApiError from "../exceptions/apiError.js";
import userModel from "../models/userModel.js";
import mailService from "./mailService.js";
import pdfService from "./pdfService.js";
import counterService from "./counterService.js";

class BookingService {
  async getAllBookings() {
    const bookings = await bookingModel.find();
    return bookings;
  }

  async addBookings(bookings) {
    const checkBookingConflict = async (date, hours, room) => {
      const existingBookings = await bookingModel.find({ date: date, room: room });
      if (existingBookings && existingBookings.length > 0) {
        for (const booking of existingBookings) {
          for (const hour of hours) {
            if (booking.hours.includes(hour)) {
              return true; // Найдено пересечение
            }
          }
        }
      }
      return false; // Пересечений нет
    };
  
    const processBooking = async (booking, userId, invoiceNumber) => {
      const { date, hours, room, paymentMethod, numberOfVisitors, additions } = booking;
      const conflict = await checkBookingConflict(date, hours, room);
  
      if (conflict) {
        throw ApiError.BadRequest(
          "Some of the selected hours are already booked in this room."
        );
      }
  
      return bookingModel.create({
        date,
        hours,
        room,
        additions,
        paymentMethod,
        numberOfVisitors,
        user: userId,
        invoiceNumber
      });
    };
  
    const userId = bookings[0].userId;
    const user = await userModel.findById(userId);
  
    // Объединяем операции в транзакцию, чтобы избежать дублирования invoiceNumber
    const session = await bookingModel.startSession();
    session.startTransaction();
  
    try {
      const newInvoiceNumber = await counterService.getNextInvoiceNumber();
  
      const bookingPromises = bookings.map(booking => processBooking(booking, userId, newInvoiceNumber));
      const newBookings = await Promise.all(bookingPromises);
  
      // const allDates = bookings.map(booking => booking.date).join(', ');
      // const allHours = bookings.flatMap(booking => booking.hours);
      // const allRooms = bookings.map(booking => booking.room).join(', ');
  
      // const pdfBill = await pdfService.createBill({
      //   date: allDates,
      //   hours: allHours,
      //   room: allRooms,
      //   firstName: user.firstName,
      //   lastName: user.lastName
      // });
  
      // await mailService.sendBookingBill(user.email, pdfBill);
  
      await session.commitTransaction();
      session.endSession();
  
      return newBookings;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }
  
  
}

export default new BookingService();
