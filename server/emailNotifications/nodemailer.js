const nodemailer = require("nodemailer")
const { google } = require("googleapis")
var hbs = require('nodemailer-express-handlebars');

const Client_ID = "88279031250-a9nfkqtoiqfht2289m4q1vr98trchv1c.apps.googleusercontent.com"
const Client_secret = "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"
const REDIRECT_URI = "https://developers.google.com/oauthplayground"
const refresh_token = "1//04vwV2p4_E3h5CgYIARAAGAQSNwF-L9IrVAtO9TFB6AMrOEQUz121IEe-mdLSb92YIiKSorcI-PnkH2XUtS2x1BW1AQtPpKN--vs"


const oAuth2Client = new google.auth.OAuth2(
  Client_ID,
  Client_secret,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: refresh_token });

const sendMail = async (email,firstName) => {
  console.log("nodemail===", email,firstName)
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'yugandhar@arokee.com',
        clientId: Client_ID,
        clientSecret: Client_secret,
        refreshToken: refresh_token,
        accessToken: accessToken,
      },
    });


    const mailOptions = {
      from: 'yugandhar@arokee.com',
      to: email,
      subject: 'Welcome to Ihostyourpet',
      text: 'Welcome to Ihostyourpet',
      html:`Thank you for registering the IHostYourPet <b>${firstName}</b>`,
      attachments: [{ filename: 'logo.png', path: './logo.png' , cid: 'unique@kreata.ee' }],
    };
   
    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}


module.exports = sendMail;