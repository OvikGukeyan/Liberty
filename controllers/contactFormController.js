import mailService from "../service/mailService.js";
import { validationResult } from "express-validator";
import ApiError from "../exceptions/apiError.js";
import FormService from "../service/formService.js";


class ContactFormController {
    async sendForm(req, res, next) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', errors.array()))
            }
            const data = req.body;
            const formData = await FormService.sendContactForm(data);

            return res.json(formData)
        } catch (error) {
            next(error)
        }
    }


    async sendApplicationForm(req, res, next) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', errors.array()))
            }
            const formData = await mailService.sendApplicationForm(req.body);

            return res.json(formData)
        } catch (error) {
            next(error)
        }
    }
    
}

export default new ContactFormController;