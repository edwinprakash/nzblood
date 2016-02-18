import { Page } from "ui/page";
import { EventData } from "data/observable";
import navigator = require("../../common/navigator");

import {NotificationModel}  from "../../view-models/notification-model";

var page;
var notificationModel = new NotificationModel();

export function onPageLoaded(args: EventData) {
    page = <Page>args.object;
}

export function navigateBack() {
    navigator.navigateBack();
}

export function showSlideout(args) {
    page.getViewById("side-drawer").toggleDrawerState();
}
    
export function subscribe() {
    notificationModel.subscribe();
}

export function unsubscribe() {
    notificationModel.unsubscribe();
}

export function check() {
    notificationModel.check();
}