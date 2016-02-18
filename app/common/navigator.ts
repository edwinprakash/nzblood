
import frame = require("ui/frame");
import viewModule = require("ui/core/view");
import platform = require("platform");

var isIOS: boolean = platform.device.os === platform.platformNames.ios;
var isAndroid: boolean = platform.device.os === platform.platformNames.android;

export function navigateToHome() {
    var topmost = frame.topmost();
    if (topmost.currentEntry.moduleName !== "views/main-page") {
        frame.topmost().navigate("views/main-page");
    }
}

export function navigateToLogin() {
    var topmost = frame.topmost();
    if (topmost.currentEntry.moduleName !== "views/login/login") {
        frame.topmost().navigate("views/login/login");
    }
}

export function navigateToContact() {
    var topmost = frame.topmost();
    if (topmost.currentEntry.moduleName !== "views/contact/contact") {
        frame.topmost().navigate("views/contact/contact");
    }
}

export function navigateToAbout() {
    var topmost = frame.topmost();
    if (topmost.currentEntry.moduleName !== "views/about/about") {
        frame.topmost().navigate("views/about/about");
    }
}

export function navigateToNotifications() {
    var topmost = frame.topmost();
    if (topmost.currentEntry.moduleName !== "views/notifications/notifications") {
        frame.topmost().navigate("views/notifications/notifications");
    }
}

export function navigateToLocation() {
    var topmost = frame.topmost();
    if (topmost.currentEntry.moduleName !== "views/location/location") {
        frame.topmost().navigate("views/location/location");
    }
}

export function navigateToVersion() {
    var topmost = frame.topmost();
    if (topmost.currentEntry.moduleName !== "views/version/version") {
        frame.topmost().navigate("views/version/version");
    }
}

export function navigateToRegister() {
    var topmost = frame.topmost();
    if (topmost.currentEntry.moduleName !== "views/register/register") {
        frame.topmost().navigate("views/register/register");
    }
}

export function navigateBack() {
    frame.goBack();
}

export function openLink(view: any) {
    var url = view.tag;
    if (url) {
        if (isIOS) {
            var nsUrl = NSURL.URLWithString(url);
            var sharedApp = UIApplication.sharedApplication();
            if (sharedApp.canOpenURL(nsUrl)) {
                sharedApp.openURL(nsUrl);
            }
        }
        else if (isAndroid) {
            var intent = new android.content.Intent(android.content.Intent.ACTION_VIEW, android.net.Uri.parse(url));
            var activity = frame.topmost().android.activity;
            activity.startActivity(android.content.Intent.createChooser(intent, "share"));
        }
    }
}