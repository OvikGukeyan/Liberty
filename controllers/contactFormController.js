import mailService from "../service/mailService.js";
import { validationResult } from "express-validator";
import ApiError from "../exceptions/apiError.js";


class ContactFormController {
    async sendForm(req, res, next) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', errors.array()))
            }
            const formData = await mailService.sendContactForm(req.body);
            await mailService.sendNotificationMail(req.body.emailAddress);

            return res.json(formData)
        } catch (error) {
            next(error)
        }
    }
}

export default new ContactFormController;