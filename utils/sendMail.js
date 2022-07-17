import { createTransport } from "nodemailer";
import { config } from 'dotenv';
config({ path: './config/config.env' });
/**
 * 
 * @property {string} email Address 
 * @property {string} email subject 
 * @property {string}  MailBody
 * @property {string}  Optional
 * @returns 
 */
export default async function SendMail({ to, subject, text, html }) {
    const transporter = createTransport({
        service: "Gmail",
        auth: {
            user: process.env.GOOGLE_USER,
            type: "OAuth2",
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN
        },

    });

    // send mail with defined transport object
    return await transporter.sendMail({
        from: `👻 ${process.env.ADMIN_MAIL}`, // sender address
        to, // list of receivers
        subject, // Subject line
        text, // plain text body
        html, // html body
    });
}