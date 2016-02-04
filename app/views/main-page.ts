import observable = require("data/observable");
import pages = require("ui/page");
import frame = require("ui/frame");
import gestures = require("ui/gestures");
import navigator = require("../common/navigator");

var page;


export function pageLoaded(){
}

export function onNavigatingTo(args: observable.EventData) {
    // Get the event sender
    page = <pages.Page>args.object;
    //page.bindingContext = mainPageVM.instance;

    if (page.ios) {
        // TODO: Making the navigation bar transparent. It would be nice if this was property on the ActionBar.
        var bar = frame.topmost().ios.controller.navigationBar; 
        bar.setBackgroundImageForBarMetrics(UIImage.new(), UIBarMetrics.UIBarMetricsDefault);
        bar.translucent = true;
        bar.shadowImage = UIImage.new();
        bar.tintColor = UIColor.whiteColor();

        // TODO: Is it possible to style the title color of the action bar?
        (<any>bar).titleTextAttributes = { [NSForegroundColorAttributeName]: UIColor.whiteColor() };
        console.log("Loading");
        var sideDrawerView = page.getViewById("side-drawer");
        sideDrawerView.ios.defaultSideDrawer.style.shadowMode = TKSideDrawerShadowMode.TKSideDrawerShadowModeSideDrawer;
        sideDrawerView.ios.defaultSideDrawer.style.dimOpacity = 0.5;
    }
}

export function showSlideout(args) {
    page.getViewById("side-drawer").toggleDrawerState();
}


/*
import viewModel = require('../view-models/main-page-model');
import {Page} from 'ui/page';

export function pageLoaded(args) {
    var page = <Page>args.object;
    
    var drawerTransitionsModel = new viewModel.DrawerTransitionsModel();
    drawerTransitionsModel.setPushTransition();
    
    page.bindingContext = drawerTransitionsModel;

    if (frame.topmost().ios){
        frame.topmost().ios.controller.interactivePopGestureRecognizer.enabled = false;
    }
}
*/