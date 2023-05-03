const nodemailer = require('nodemailer');
const {google} = require('googleapis');

const CLIENT_ID = "142149930053-0fd6lid1m286pvi2elok46q3ugisc4fn.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = "1//04BEyhmRq9KrxCgYIARAAGAQSNwF-L9IrtX9fsotZi4NdPTZONA44MzJbXPMHUcSvTcXb-t3rUOIFIflJlK68mC4kSBp0JgQANrI";


const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN });


async function sendMail(){
    try{
        const accessToken = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'vijaysingh829912@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        });

        const mailOptions = {
            from: "vijaysingh <vijaysingh829912@gmail.com",
            to: "vijay19cs130@satiengg.in",
            subject: "sample subject",
            text: "hello i am writing this mail to myself.",
            html: '<h1> this is html part completely optional. </h1>'
        };

        const result = await transport.sendMail(mailOptions);
        return result;
    }
    catch(err){
        return err;
    }
}


sendMail().then((result)=> console.log('EMail sent...', result))
.catch((error)=> console.log(error.message));