const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN } = require("./config")
const OAuth2 = google.auth.OAuth2;
const CLIENT_URI = "https://developers.google.com/oauthplayground";
const oauth2client = new OAuth2(CLIENT_ID, CLIENT_SECRET, CLIENT_URI);      // Creating the oauth client object.

oauth2client.setCredentials({               // Setting up refresh token, that will help to get new access token.
    refresh_token: REFRESH_TOKEN
});

async function sendMail() {
    try {
        const accessToken = await oauth2client.getAccessToken();        // Getting the new access token which changes every 5000 secong.
        const smtpTransporter = nodemailer.createTransport({            // Creating the SMTP transproter through nodemailer.
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "krsailesh2001@gmail.com",                        // Client.
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        });

        const mailOptions = {                                           // Mail related information.
            from: "krsailesh2001@gmail.com",
            to: "krsailesh2001@gmail.com",
            subject: "Emailing through google api",
            text: "successful testing"
        };

        const result = await smtpTransporter.sendMail(mailOptions);     // Sending the mail which returns promise
        return result;

    } catch (error) {               
        return error
    }
}

sendMail()
    .then(res => console.log("Email sent...", res))         // Logging the response after successful email sent.
    .catch(err => console.log(err));                        // Logging the error on unseccessful email set.