## How to setup FCM V1  
1. npm install  @react-native-firebase/app  @react-native-firebase/messaging
2. npm install --global eas-cli
3. login expo and setup eas config.json
4. Create app in [FCM](console.firebase.google.com)   STEP This ==> [Link](https://docs.expo.dev/push-notifications/fcm-credentials/)
5. Add google Service to app.json 
6. Build to expo  npx eas build -p android --profile preview

## Step Backend
1. Create Cradentials on [Iam Admin](https://console.cloud.google.com/iam-admin)
2. add Role Firebase Cloud Messaging API Admin for get Authorization
3. Test Get Auth [GoogleAPI](https://developers.google.com/oauthplayground)
4. get token  Select  Firebase Cloud Messaging API Admin
5. Url Message  ``` Url https://fcm.googleapis.com/v1/projects/{ProjectId}/messages:send ``` projectId Get from  [FCM](https://console.firebase.google.com/) => Project settings => Project ID  =>  `
noti-418e0`
6. Body
```
{
   "message":{
      "token":"cN9V5avUSnumXtktjE49P2:APA91bFsiFZFVJcExUpZRax7KDh-hq3Jju-s5j6tW0JTrvBAjSVOW-YcpozcPaIVHi9dt7tGbBZs3If-ruti_ffXAyq2yJZor0WCzgvh8UBImUIqxnkVrKudm_2ixOHbzyEKoMWkPIqT",
      "notification":{
        "body":"This is an FCM notification message!",
        "title":"FCM Message 02"
      }
   }
}
 ```
7. Authorization bearerToken or OAUTH2.0 .  can use token from step `3`
