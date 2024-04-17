import nodemailer from 'nodemailer';

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.strato.de',
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: 'noreply@libertyfinanz.de',
                pass: 'ceqme6-donxyn-xyvVem'
            }
        })
    };


    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: 'noreply@libertyfinanz.de',
            to,
            subject: 'Email activation for ' + process.env.API_URL,
            text: '',
            html:
                `
                    <div>
                        <h1>To activate follow the link</h1>
                        <a href="${link}"> ${link} </a>
                    </div>
                `

        })
    }

    async sendContactForm(data) {
        await this.transporter.sendMail({
            from: 'noreply@libertyfinanz.de',
            to: 'info@libertyfinanz.de',
            subject: 'Contact form for ' + data.emailAdress,
            text: '',
            html:
                `
                    <div>
                        <ul>
                            <li>Manager: ${data.manager}</li>
                            <li>Anrede: ${data.salutation}</li>
                            <li>Titel: ${data.titel}</li>
                            <li>Vorname: ${data.firstName}</li>
                            <li>Nachname: ${data.lastName}</li>
                            <li>Email: ${data.emailAdress}</li>
                            <li>Mobil: ${data.phoneNumber}</li>
                            <li>Straße: ${data.adress}</li>
                            <li>PLZ: ${data.zipCode}</li>
                            <li>Ort: ${data.city}</li>
                            <li>Land: ${data.country}</li>
                            <li>Thema: ${data.topic}</li>
                            <li>Bemerkung: ${data.description}</li>
                            <li>Check: ${data.check}</li>
                        </ul>
                    </div>
                `
        })
    };


    async sendNotificationMail(to) {
        await this.transporter.sendMail({
            from: 'noreply@libertyfinanz.de',
            to,
            subject: 'Contact formular' ,
            text: '',
            html:
                `
                    <div>
                        <h1>Vielen Dank für Ihr Vertrauen.<br />
                        Wir kümmern uns schnellstmöglich um Ihr Anliegen</h1>
                    </div>
                `

        })
    }
}

export default new MailService();