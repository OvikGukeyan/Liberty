import jwt from "jsonwebtoken";
import ApiError from "../exceptions/apiError.js";
import mailService from "./mailService.js";

class FormService {
  async sendContactForm(data) {
    
    const decodedManager = await jwt.verify(
        data.manager,
        process.env.JWT_MANAGER_SECRET,
        (erorr, decoded) => {
            if(erorr) {
                console.log('wrong token', erorr)
                return data.manager
            }
            return decoded
        }
      
    );
    const formData = await mailService.sendContactForm({...data, manager: decodedManager.id});
    await mailService.sendNotificationMail(data.emailAddress);
    return formData;
  }
}

export default new FormService();
