import { Router } from "express";
import UserController from "../controllers/userController.js";
import { registrationValidation } from "../validations.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = new Router();

router.post('/registration', registrationValidation, UserController.registration);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/activate/:link', UserController.activate);
router.get('/refresh', UserController.refresh);
router.get('/users', authMiddleware, UserController.getUsers);

export default router;