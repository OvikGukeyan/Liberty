import nodemailer from 'nodemailer';

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.mailersend.net',
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: 'MS_Js9g6F@trial-3z0vklo8y0e47qrx.mlsender.net',
                pass: 'W0mlg3IfIvTywBcR'
            }
        })
    }
    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: 'MS_Js9g6F@trial-3z0vklo8y0e47qrx.mlsender.net',
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

    async sendContactForm(email) {
        await this.transporter.sendMail({
            from: 'MS_Js9g6F@trial-3z0vklo8y0e47qrx.mlsender.net',
            to: '0953188061ovik@gmail.com',
            subject: 'Contact form for' + email,
            text: '',
            html:
                `
                    <div>
                        <h1>${email}</h1>
                    </div>
                `

        })
    }
}

export default new MailService();