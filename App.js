import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import messaging from '@react-native-firebase/messaging'
import { useState, useEffect, useRef } from 'react';

export default function App() {
  const [tokens,setTokens] = useState();
  const reqUserPermission = async () =>
    {
      const authState = await messaging().reqUserPermission();
      const enable =
      authState === messaging.AuthorizationStatus.AUTHORIZED ||
      authState === messaging.AuthorizationStatus.PROVISIONAL;

      if(enable){
        console.log("Authorization state: ",authState)
      }
    };
    
    useEffect(() => {
      if(reqUserPermission()){
        messaging()
        .getToken()
        .then((token)=>{
          console.log(token);
          setTokens(token);
          Alert.alert(" A new Token FCM message arrived!",JSON.stringify(token))
        });
      }else{
        console.log("Permission not granted ",authState)
      }

      messaging()
      .getInitialNotification()
      .then(async (remoteMessage) =>{
        if(remoteMessage){
          console.log(
            "notification app to open from quit state",remoteMessage.notification
          );
        }
      })
    

      messaging().onNotificationOpenedApp((remoteMessage)=>{
        console.log("Notification app to open from BG state",remoteMessage.notification);
      })

      messaging().setBackgroundMessageHandler((remoteMessage)=>{
        console.log("Message handle in  BG state",remoteMessage);
      })

      const unsubscript = messaging().onMessage(async (remoteMessage) =>{
        Alert.alert(" A new FCM message arrived!",JSON.stringify(remoteMessage))
      });

       return unsubscript;
    }, [])
    
    useEffect(()=>{

    },[tokens])
  // RegisterSubscription("test");
  // async function RegisterSubscription(token)
  // {
  //   try{
  //     let data = {
  //       UserId : "01901518-cf6e-758b-a490-c9ccf091461c",
  //       Token :token
  //     };// FCM iphone ExponentPushToken[at6FCnM2mqTVI8NFA44CWu]
  //     await fetch('http://localhost:8011/api/Notifications', {
  //       method: 'POST',
  //       body:JSON.stringify(data)
    
  //     }).then((res)=>console.log(res)).catch((err)=>console.log("Error",err))
  //   }catch{}
    
  // }
  
  return (
    <View style={styles.container}>
     {/* <PushFCM/> */}
     <View>
     <TextInput
            style={{padding: 10}}
        value={tokens}
      />
     </View>
     <Text>
     {tokens}
     </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
