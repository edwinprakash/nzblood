import frameModule = require("ui/frame");
import drawerModule = require("nativescript-telerik-ui/sidedrawer");
import {EventData} from "data/observable";

export class DrawerTransitionsModel {
    
    public setPushTransition() {
        this.setDrawerTransition(new drawerModule.PushTransition());
    }
    
    /*
    public onFadeTransitionTap(args) {
        this.setDrawerTransition(new drawerModule.FadeTransition());
    }

    public onRevealTransitionTap(args) {
        this.setDrawerTransition(new drawerModule.RevealTransition());
    }

    public onReverseSlideOutTransitionTap(args) {
        this.setDrawerTransition(new drawerModule.ReverseSlideOutTransition());
    }

    public onScaleDownPusherTransitionTap(args) {
        this.setDrawerTransition(new drawerModule.ScaleDownPusherTransition());
    }

    public onScaleUpTransitionTap(args) {
        this.setDrawerTransition(new drawerModule.ScaleUpTransition());
    }

    public onSlideAlongTransitionTap(args) {
        this.setDrawerTransition(new drawerModule.SlideAlongTransition());
    }

    public onSlideInOnTopTransitionTap(args) {
        this.setDrawerTransition(new drawerModule.SlideInOnTopTransition());
    }
*/
    public openSideDrawer(args: EventData) {
        var drawer: drawerModule.RadSideDrawer = <drawerModule.RadSideDrawer>frameModule.topmost().getViewById("side-drawer");
        drawer.showDrawer();
    }

    public closeSideDrawer(args: EventData) {
        var drawer: drawerModule.RadSideDrawer = <drawerModule.RadSideDrawer>frameModule.topmost().getViewById("side-drawer");
        drawer.closeDrawer();
    }


    private setDrawerTransition(transition: drawerModule.DrawerTransitionBase) {
        var drawer: drawerModule.RadSideDrawer = <drawerModule.RadSideDrawer>frameModule.topmost().getViewById("side-drawer");
        drawer.drawerTransition = transition;
    }
}
