import nodemailer from "nodemailer";

export const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.Email,
        port: process.env.Email_PASS,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    await transporter.sendMail({
        from: `"LexEye"<${process.env.EMAIL}>`,
        to,
        subject,
        html,
        
    });   
};