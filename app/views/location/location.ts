import { Page } from "ui/page";
import { EventData } from "data/observable";
import { Image } from "ui/image";
import imageSource = require("image-source");
import navigator = require("../../common/navigator");
import mapsModule = require("nativescript-google-maps-sdk");

var page;

export function onPageLoaded(args: EventData) {
    page = <Page>args.object;
}

export function navigateBack() {
    navigator.navigateBack();
}

export function showSlideout(args) {
    page.getViewById("side-drawer").toggleDrawerState();
}

function wait(milliSeconds) {
    return new Promise(function(resolve, reject) {
        setTimeout(function(){
           resolve(milliSeconds);
        }, milliSeconds);
    });
}

export function onMapReady(args) {
    console.log("onMapReady");

    var mapView = args.object;

    console.log("Setting a marker...");

    var marker = new mapsModule.Marker();
    marker.position = mapsModule.Position.positionFromLatLng(-41.287343, 174.7743449);
    marker.title = "Victoria Street Bistro";
    marker.snippet = "Tomato juice ";
    marker.userData = { index : 1};
    
    var icon = new Image();
    icon.imageSource = imageSource.fromResource('icon');
    marker.icon = icon;
    // marker.icon = 'icon';
    marker.alpha = 0.8;
    marker.flat = true;
    marker.draggable = true;
        
    mapView.addMarker(marker);
}

export function onMarkerSelect(args) {
   console.log("Clicked on "+args.marker.title);
}

var lastCamera = null;
export function onCameraChanged(args) {
    console.log("Camera changed: "+JSON.stringify(args.camera), JSON.stringify(args.camera) === lastCamera);
    lastCamera = JSON.stringify(args.camera); 
}
