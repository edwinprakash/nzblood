import { Page } from "ui/page";
import { EventData } from "data/observable";
import navigator = require("../../common/navigator");

import dialogsModule = require("ui/dialogs");
import frameModule = require("ui/frame");
import {UserViewModel}  from "../../view-models/user-view-model";

import Sqlite = require("nativescript-sqlite");

var user = new UserViewModel();
var page;

export function onPageLoaded(args: EventData) {
    
    page = <Page>args.object;
    page.bindingContext = user;
    
    if (!Sqlite.exists(user.dbname)) {
        Sqlite.copyDatabase(user.dbname);
    }
    new Sqlite(user.dbname, function(err, dbConnection) {
	if (err) {
	    console.log(err);
	}
        user.db = dbConnection;
        user.db.resultType(Sqlite.RESULTSASOBJECT);
    });
}


export function signIn() {
    var vm = this;
    
    if (user.isValidEmail()) {
        var response = user.login();
        debugger;
        /*
            .catch(function(error) {
                console.log(error);
                dialogsModule.alert({
                    message: "Unfortunately we could not find your account.",
                    okButtonText: "OK"
                });
            })
            .then(function(r) {
                //frameModule.topmost().navigate("views/list/list");
                console.log("logged in");
            });*/
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