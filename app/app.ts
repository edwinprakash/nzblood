import application = require("application");


if(application.android) {
    application.onLaunch = function (intent) {
        console.log("onLaunch");
        //com.facebook.drawee.backends.pipeline.Fresco.initialize(application.android.context);
        application.android.onActivityStarted = function (activity) {
            console.log("onStarted");
            var window = activity.getWindow();
            if (window) {
                window.setBackgroundDrawable(null);
            }
        }
    }
}

if (application.ios) {
    application.on("launch", args => {
        // TODO: It would be nice if this was ios-specific property on the action bar and static property on application.ios.
        UIApplication.sharedApplication().statusBarStyle = UIStatusBarStyle.UIStatusBarStyleLightContent;
        setTimeout(() => {
            UIApplication.sharedApplication().keyWindow.backgroundColor = UIColor.blackColor();
        }, 1);
    });
    
    GMSServices.provideAPIKey("AIzaSyAwJrSoBXJSJDR4uxJ4PrSok1tNCzIiFqQ");
}



application.mainModule = "views/main-page";
//application.cssFile = "./app.css";
application.start();
