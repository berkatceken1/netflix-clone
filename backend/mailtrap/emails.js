import { mailtrapClient, sender } from "./mailtrap.config.js";
import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "E-Posta Doğrulama", 
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification",
        });

        console.log("E-posta başarıyla gönderildi:", response);
    } catch (error) {
        console.error("E-posta gönderilirken bir hata oluştu:", error);
        throw new Error(`Error sending verification email: ${error}`);
    }
};

export const sendWelcomeEmail = async (email, username) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "7d0089ad-538d-43ad-9c62-e1d9a6715374",
            template_variables: {
                "name": username
            }, 
        });

        console.log("Hoşgeldiniz e-postası başarıyla gönderildi:", response);
    } catch (error) {
        console.error("E-posta gönderilirken bir hata oluştu:", error);
        throw new Error(`Error sending welcome email: ${error}`);
    }
};

export const sendResetPasswordEmail = async (email, resetURL) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Şifre Sıfırlama",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset",
        });
    } catch (error) {
        console.error("E-posta gönderilirken bir hata oluştu:", error);
        throw new Error(`Error sending reset password email: ${error}`);
    }
};

export const sendResetPasswordSuccessEmail = async (email) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Şifre Sıfırlama Başarılı",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset",
        });

        console.log("Şifre sıfırlama başarılı e-postası başarıyla gönderildi:", response);
    } catch (error) {
        console.error("E-posta gönderilirken bir hata oluştu:", error);
        throw new Error(`Error sending reset password success email: ${error}`);
    }
};