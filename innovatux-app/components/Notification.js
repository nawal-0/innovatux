import React, { useEffect, useRef } from "react";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { useUser } from "./UserContext";

/**
 * Notification Component
 * 
 * This component handles the registration for push notifications and sets up listeners
 * to handle incoming notifications and user interactions with notifications.
 * It leverages Expo's Notifications API to manage push notifications within the app.
 * 
 */
export default function Notification() {
    const { user } = useUser();
    const notificationListener = useRef();
    const responseListener = useRef();
    
    useEffect(() => {
        registerForPushNotificationsAsync().then((token) => console.log(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(
        (notification) => {
            console.log(notification);
        }
        );

        responseListener.current = Notifications.addNotificationResponseReceivedListener(
        (response) => {
            console.log(response);
        }
        );
    
        return () => {
        Notifications.removeNotificationSubscription(notificationListener);
        Notifications.removeNotificationSubscription(responseListener);
        };
    }, []);
    
    return null;
}

/**
 * Registers the device for push notifications and retrieves the Expo push token.
 * Configures notification channels for Android devices.
 * 
 * @returns {Promise<string | undefined>} Returns the Expo push token
 * if registration is successful, otherwise undefined.
 */
async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
        }
        if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        alert("Must use physical device for Push Notifications");
    }
    
    if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
        });
    }
    
    return token;
}