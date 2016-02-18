import { Page } from "ui/page";
import { EventData } from "data/observable";
import navigator = require("../../common/navigator");

import dialogsModule = require("ui/dialogs");
import frameModule = require("ui/frame");
import {UserViewModel}  from "../../view-models/user-view-model";

var user = new UserViewModel();



var page;

export function onPageLoaded(args: EventData) {
    page = <Page>args.object;
    page.bindingContext = user;
}


export function signIn() {
    if (user.isValidEmail()) {
        user.login()
            .catch(function(error) {
                console.log(error);
                dialogsModule.alert({
                    message: "Unfortunately we could not find your account.",
                    okButtonText: "OK"
                });
            })
            .then(function() {
                //frameModule.topmost().navigate("views/list/list");
                console.log("logged in");
            });
    } else {
        dialogsModule.alert({
            message: "Enter a valid email address.",
            okButtonText: "OK"
        });
    }
};

export function register() {
    navigator.navigateToRegister();
};

export function navigateBack() {
    navigator.navigateBack();
}

export function showSlideout(args) {
    page.getViewById("side-drawer").toggleDrawerState();
}