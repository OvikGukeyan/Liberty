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
    console.log(decodedManager)
    const formData = await mailService.sendContactForm({...data, manager: decodedManager.id});
    const emailText = 'Vielen Dank für Ihr Vertrauen. Wir kümmern uns schnellstmöglich um Ihr Anliegen.'
    await mailService.sendNotificationMail(data.email, emailText);
    return formData;
  }
}

export default new FormService();
