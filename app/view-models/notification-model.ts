import {Observable} from  "data/observable";
import pushPlugin = require('nativescript-push-notifications');

export class NotificationModel extends Observable {

    private settings = {
        // Android settings
        senderID: '317257800194', // Android: Required setting with the sender/project number
        notificationCallbackAndroid: this.notificationCallbackAndroid,

        // iOS settings
        badge: true, // Enable setting badge through Push Notification
        sound: true, // Enable playing a sound
        alert: true, // Enable creating a alert

        // Callback to invoke, when a push is received on iOS
        notificationCallbackIOS: this.notificationCallbackIOS
    }


    public notificationCallbackAndroid(message, pushNotificationObject) { // Android: Callback to invoke when a new push is received.
            
        console.log(JSON.stringify(pushNotificationObject));
        alert(JSON.stringify(message));
    }

    public notificationCallbackIOS(message) {
        alert(JSON.stringify(message));
    }

    public subscribe() {
        
        var notificationSettings = this.settings;

        pushPlugin.register(notificationSettings,
            // Success callback
            function(token) {
                console.log(token);
            
                // if we're on android device we have the onMessageReceived function to subscribe
                // for push notifications
                if (pushPlugin.onMessageReceived) {
                    debugger;
                    pushPlugin.onMessageReceived(notificationSettings.notificationCallbackAndroid);
                }

                alert('Device registered successfully');
            },
            // Error Callback
            function(error) {
                alert(error.message);
            }
        );
    }

    public unsubscribe() {

        pushPlugin.unregister(
            // Success callback
            function() {
                alert('Device unregistered successfully');
            },
            // Error Callback
            function(error) {
                alert(error.message);
            },

            // The settings from the registration phase
            this.settings
        );
    }

    public check() {
        pushPlugin.areNotificationsEnabled(function(areEnabled) {
            alert('Are Notifications enabled: ' + areEnabled);
        });
    }
}