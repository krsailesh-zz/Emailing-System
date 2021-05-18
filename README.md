# Emailing-System

 To install packages run : 
```
npm install
```

 Create a config file and export { CLIENT_ID, CLIENT_SECRET, CLIENT_URI, REFRESH_TOKEN } to app.js file.
 CLIENT_ID and CLIENT_SECRET can be get from https://console.cloud.google.com/ after creating new project and creating client credentials.
 REFRESH_TOKEN can be get from https://developers.google.com/oauthplayground after adding CLIENT_ID and CLIENT_SECRET and authorizing it.

 To send email run :
```
node app.js
```

Sample response screenshot
![email_response](https://user-images.githubusercontent.com/48131501/118647096-9556c500-b7fe-11eb-81d1-d30bbf5fdc46.png)
