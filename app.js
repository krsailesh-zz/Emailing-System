const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { CLIENT_ID, CLIENT_SECRET, CLIENT_URI, REFRESH_TOKEN } = require("./config")
const OAuth2 = google.auth.OAuth2;

const oauth2client = new OAuth2(CLIENT_ID, CLIENT_SECRET, CLIENT_URI);

oauth2client.setCredentials({
    refresh_token: REFRESH_TOKEN
});

async function sendMail() {
    try {
        const accessToken = await oauth2client.getAccessToken();
        const smtpTransporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "krsailesh2001@gmail.com",
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        });

        const mailOptions = {
            from: "krsailesh2001@gmail.com",
            to: "krsailesh2001@gmail.com",
            subject: "Emailing through google api",
            text: "successful testing"
        };

        const result = await smtpTransporter.sendMail(mailOptions);
        return result;

    } catch (error) {
        return error
    }
}

sendMail()
    .then(res => console.log("Email sent...", res))
    .catch(err => console.log(err));