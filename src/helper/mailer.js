import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';
import User from "@/models/userModel";

export const sendEmail = async ({ email, emailType, userId }) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        const updateData = {
            verifyToken: emailType === "VERIFY" ? hashedToken : undefined,
            verifyTokenExpiration: emailType === "VERIFY" ? Date.now() + 3600000 : undefined,
            forgotPasswordToken: emailType === "RESET" ? hashedToken : undefined,
            forgotPasswordTokenExpiration: emailType === "RESET" ? Date.now() + 3600000 : undefined,
        };

        await User.findByIdAndUpdate(userId, updateData, { new: true });

        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "8bc2be6e38e8d0",
                pass: "5825015d7accda"
            }
        });

        const mailOptions = {
            from: 'yash3423@yash.ai',
            to: email,
            subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.BASE_URL}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} or copy and paste the link below in your browser.<br>${process.env.BASE_URL}/verifyemail?token=${hashedToken}</p>`,
        };

        const mailResponse = await transporter.sendMail(mailOptions);

        console.log(mailResponse);
        return mailResponse;

    } catch (error) {
        throw new Error(error.message);
    }
};
