import nodemailer from 'nodemailer';

export const sendEmail = async (email, subject, html) => {
    // Ensure that environment variables are set
    if (!process.env.EMAIL || !process.env.EMAIL_PASS) {
        console.error('Missing email credentials in environment variables');
        throw new Error('Missing email credentials');
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',  // You can change to other services like SendGrid, if needed
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS,  // Consider using an app-specific password
        },
    });

    const mailOptions = {
        from: `"LexEye" <${process.env.EMAIL}>`,  // Sender's email address
        to: email,  // Recipient's email address
        subject,  // Email subject
        html,  // Email content in HTML format
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent: ${info.response}`);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Email sending failed');
    }
};
