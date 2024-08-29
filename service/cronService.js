import cron from 'node-cron';
import bookingModel from '../models/bookingModel.js';
import mailService from './mailService.js';


export const scheduleCronJobs = async () => {
  
    // Schedule a task to run daily at a specific time (e.g., midnight)
    cron.schedule('0 0 * * *', async () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const startOfDay = new Date(tomorrow.setHours(0, 0, 0, 0));
      const endOfDay = new Date(tomorrow.setHours(23, 59, 59, 999));
  
      const bookings = await bookingModel.find({
        date: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      }).populate ({
        path: 'user',
        select: '-password'
    });
  
      bookings.forEach(booking => {
        const emailText = `Reminder: You have a booking scheduled for ${booking.date}.`;
        console.log(booking.user)
        mailService.sendNotificationMail(booking.user.email, emailText)
      });
    });
  };
  