import * as navigator from "../../common/navigator"
import { topmost } from "ui/frame"

export function onLoaded(args) {
    
}

function sideDrawer(): any {
    return topmost().currentPage.getViewById("side-drawer");
}

function closeDrawer() {
    var instance = sideDrawer();
    if (instance) {
        instance.closeDrawer();
    }
}

function toggleDrawerState() {
    var instance = sideDrawer();
    if (instance) {
        instance.toggleDrawerState();
    }
}

export function showSlideout(args) {
    toggleDrawerState();
}

export function tapHome(args) {
    closeDrawer();
    navigator.navigateToHome();
}

export function tapLogin(args) {
    closeDrawer();
    navigator.navigateToLogin();
}

export function tapContact(args) {
    closeDrawer();
    navigator.navigateToContact();
}

export function tapAbout(args) {
    closeDrawer();
    navigator.navigateToAbout();
}

export function tapLocation(args) {
    closeDrawer();
    navigator.navigateToLocation();
}

export function tapDrawerLink(args) {
    closeDrawer();
    navigator.openLink(args.object);
}

export function tapVersion(args) {
    closeDrawer();
    navigator.navigateToVersion();
}
