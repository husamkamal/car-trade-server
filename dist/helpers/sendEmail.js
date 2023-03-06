"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendEmail = (userInfo, subject, content) => {
    const { SECRET_EMAIL, SECRET_PASSWORD } = process.env;
    const transporter = nodemailer_1.default.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: SECRET_EMAIL,
            pass: SECRET_PASSWORD,
        },
    });
    const mailOptions = {
        from: 'cartredee@gmail.com',
        to: userInfo.email,
        subject,
        html: content,
    };
    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            return { status: 500 };
        }
        return '';
    });
};
exports.default = sendEmail;
//# sourceMappingURL=sendEmail.js.map