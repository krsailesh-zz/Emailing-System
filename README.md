# Emailing-System

#### Clone the repo in your local system

 To install packages run : 
```
npm install
```

 Create a config file and export { USER, CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN } to app.js file.
 USER = your email addess
 CLIENT_ID and CLIENT_SECRET can be get from https://console.cloud.google.com/ after creating new project and creating client credentials.
 REFRESH_TOKEN can be get from https://developers.google.com/oauthplayground after adding CLIENT_ID and CLIENT_SECRET and authorizing it.

 To send email follow the steps below : <br/>
 i) First start the server by running : 
```
node app.js
```
ii) Open your browser and go to the url = http://localhost:8080/api/sendmail

Then you sholud see the response on your screen as well as in your console.
You should also check your email.

Sample response in the condole screenshot
![email_response](https://user-images.githubusercontent.com/48131501/118647096-9556c500-b7fe-11eb-81d1-d30bbf5fdc46.png)
