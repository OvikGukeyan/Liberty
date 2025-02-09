import { Router } from "express";
import UserController from "../controllers/userController.js";
import ContactFormController from '../controllers/contactFormController.js';
import { formValidation, registrationValidation, applicationFormValidation, bookingValidation } from "../validations.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import BookingController from "../controllers/bookingController.js";
import ReviewController from "../controllers/reviewsController.js";
import multer from 'multer';



const upload = multer({ dest: 'uploads/' })
const router = new Router();

router.post('/registration', registrationValidation, UserController.registration);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/activate/:link', UserController.activate);
router.get('/refresh', UserController.refresh);
router.get('/users', authMiddleware, UserController.getUsers);
router.get('/reviews', ReviewController.getReviews);
router.post('/contact', formValidation, ContactFormController.sendForm);
router.post('/job', upload.single('cv'), ContactFormController.sendApplicationForm);


router.get('/bookings', BookingController.getBookings);
router.post('/book', authMiddleware, bookingValidation, BookingController.addBooking);





export default router;