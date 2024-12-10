import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "Email activation",
      text: "",
      html: `
                    <div>
                        <h1>To activate follow the link</h1>
                        <a href="${link}"> ${link} </a>
                    </div>
                `,
    });
  }

  async sendContactForm(data) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.MAIL_OFICE,

      subject: "Contact form for " + data.email,
      text: "",
      html: `
                    <div>
                        <ul>
                            <li>Manager: ${data.manager}</li>
                            <li>Anrede: ${data.salutation}</li>
                            <li>Titel: ${data.titel}</li>
                            <li>Vorname: ${data.firstName}</li>
                            <li>Nachname: ${data.lastName}</li>
                            <li>Email: ${data.email}</li>
                            <li>Mobil: ${data.phoneNumber}</li>
                            <li>Straße: ${data.address}</li>
                            <li>PLZ: ${data.zipCode}</li>
                            <li>Ort: ${data.city}</li>
                            <li>Land: ${data.country}</li>
                            <li>Thema: ${data.topic}</li>
                            <li>Bemerkung: ${data.description}</li>
                            <li>Check: ${data.check}</li>
                        </ul>
                    </div>
                `,
    });
  }

  async sendApplicationForm(data, cvFile) {
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.MAIL_OFICE,
      subject: "Application Form from " + data.email,
      text: "",
      html: `
        <div>
            <ul>
                <li>Vorname: ${data.firstName}</li>
                <li>Nachname: ${data.lastName}</li>
                <li>Email: ${data.email}</li>
                <li>Mobil: ${data.phoneNumber}</li>
                <li>Communication method: ${data.communicationMethod}</li>
                <li>Bemerkung: ${data.description}</li>
                <li>Check: ${data.check}</li>
            </ul>
        </div>
      `
    };

    if (cvFile) {
        mailOptions.attachments = [
            {
                filename: cvFile.originalname,
                content: cvFile,
            },
        ];
    }

    await this.transporter.sendMail(mailOptions);
}


  
  async sendNotificationMail(to, emailText) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "Contact formular",
      text: "",
      html: `
                    <div>
                        <h1>${emailText}</h1>
                    </div>
                `,
    });
  }

  async sendBookingBill(to, pdfBytes) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "'Your Booking Bill",
      text: "",
      html: `
                    <div>
                        <h1>Please find attached the bill for your booking.</h1>
                    </div>
                `,
      attachments: [
        {
          filename: "bill.pdf",
          content: pdfBytes,
          contentType: "application/pdf",
        },
      ],
    });
  }
}

export default new MailService();
