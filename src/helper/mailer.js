import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';
import User from '@/models/userModel';

export const sendEmail = async ({ email, emailType, userId }) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailType === "VERIFY") {
            const updatedUser = await User.findByIdAndUpdate(userId, {
                $set: {
                    verifyToken: hashedToken,
                    verifyTokenExpiration: new Date(Date.now() + 3600000,) // 1 hour
                }
            },);
            console.log("updated user for VERIFY", updatedUser);

        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                $set: {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiration: new Date(Date.now() + 3600000,) // 1 hour
                }
            },)
        }


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
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} or copy and paste the link below in your browser.<br>${process.env.BASE_URL}/verifyemail?token=${hashedToken}</p>`,
        };

        const mailResponse = await transporter.sendMail(mailOptions);

        console.log(mailResponse);
        return mailResponse;

    } catch (error) {
        throw new Error(error.message);
    }
};
