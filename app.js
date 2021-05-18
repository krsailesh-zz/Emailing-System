const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { USER, CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN } = require("./config")     // config file have all the clients credentials
const OAuth2 = google.auth.OAuth2;

const app = express();

const   PORT = process.env.PORT || 8080;

// Middleware 
app.use(express.json())                                             // To send response as json format.

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
                user: USER,                        // Client.
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        });

        const mailOptions = {                                           // Mail related information.
            from: USER,
            to: USER,
            subject: "Emailing through google api",
            text: "successful testing"
        };

        const result = await smtpTransporter.sendMail(mailOptions);     // Sending the mail which returns promise
        return result;

    } catch (error) {               
        return error
    }
}


app.get('/', (req, res) => {
    res.send("Emailing System!");
})

app.get('/api/sendmail', (req, res) => {                    // API endpoint
    sendMail()                                              // Logging the response after successful email sent.
    .then(mailRes => {
        console.log("Email sent...", mailRes);
        res.json({'Response': mailRes})
    })         
    .catch(err => console.log(err));                        // Logging the error on unseccessful email set.
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));