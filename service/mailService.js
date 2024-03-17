import nodemailer from 'nodemailer';

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.ukr.net',
            port: 465,
            secure: false,
            auth: {
                user: 'ovikhukieian@ukr.net',
                pass: 'ByLlt580YYfmSYei'
            }
        })
    }
    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: 'ovikhukieian@ukr.net',
            to,
            subject: 'Email activation',
            text: '',
            html:
                `
                    <div>
                        <h1>To activate follow the link</h1>
                        <a href="${link}"> ${link} </a>
                    </div>
                `

        }, (err) => {
            console.log(err)
        })
    }
}

export default new MailService();