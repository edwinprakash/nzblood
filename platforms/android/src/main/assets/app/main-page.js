require('reflect-metadata');
var text_view_1 = require('ui/text-view');
var frame_1 = require('ui/frame');
var application_1 = require('nativescript-angular/application');
var core_1 = require('angular2/core');
var MainPage = (function () {
    function MainPage() {
        this.message = "Hi, Angular!";
    }
    MainPage = __decorate([
        core_1.Component({
            selector: 'main',
            template: "\n<StackLayout orientation='vertical'>\n    <Label [text]='message' class='title' (tap)='message = \"Oh! Hi again...\"'></Label>\n</StackLayout>\n",
        })
    ], MainPage);
    return MainPage;
})();
function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = "";
    console.log('BOOTSTRAPPING...');
    application_1.nativeScriptBootstrap(MainPage, []).then(function (appRef) {
        console.log('ANGULAR BOOTSTRAP DONE.');
    }, function (err) {
        console.log('ERROR BOOTSTRAPPING ANGULAR');
        var errorMessage = err.message + "\n\n" + err.stack;
        console.log(errorMessage);
        var view = new text_view_1.TextView();
        view.text = errorMessage;
        frame_1.topmost().currentPage.content = view;
    });
}
exports.pageLoaded = pageLoaded;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi1wYWdlLnRzIl0sIm5hbWVzIjpbIk1haW5QYWdlIiwiTWFpblBhZ2UuY29uc3RydWN0b3IiLCJwYWdlTG9hZGVkIl0sIm1hcHBpbmdzIjoiQUFBQSxRQUFPLGtCQUFrQixDQUFDLENBQUE7QUFDMUIsMEJBQXVCLGNBQWMsQ0FBQyxDQUFBO0FBQ3RDLHNCQUFzQixVQUFVLENBQUMsQ0FBQTtBQUNqQyw0QkFBb0Msa0NBQWtDLENBQUMsQ0FBQTtBQUN2RSxxQkFBd0IsZUFBZSxDQUFDLENBQUE7QUFHeEM7SUFBQUE7UUFTV0MsWUFBT0EsR0FBV0EsY0FBY0EsQ0FBQ0E7SUFDNUNBLENBQUNBO0lBVkREO1FBQUNBLGdCQUFTQSxDQUFDQTtZQUNWQSxRQUFRQSxFQUFFQSxNQUFNQTtZQUNoQkEsUUFBUUEsRUFBRUEsb0pBSVZBO1NBQ0FBLENBQUNBO2lCQUdEQTtJQUFEQSxlQUFDQTtBQUFEQSxDQUFDQSxBQVZELElBVUM7QUFFRCxvQkFBMkIsSUFBSTtJQUMzQkUsSUFBSUEsSUFBSUEsR0FBR0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7SUFDdkJBLElBQUlBLENBQUNBLGNBQWNBLEdBQUdBLEVBQUVBLENBQUNBO0lBRXpCQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxrQkFBa0JBLENBQUNBLENBQUNBO0lBQ2hDQSxtQ0FBcUJBLENBQUNBLFFBQVFBLEVBQUVBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFVBQUNBLE1BQU1BO1FBQzVDQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSx5QkFBeUJBLENBQUNBLENBQUNBO0lBQzNDQSxDQUFDQSxFQUFFQSxVQUFDQSxHQUFHQTtRQUNIQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSw2QkFBNkJBLENBQUNBLENBQUNBO1FBQzNDQSxJQUFJQSxZQUFZQSxHQUFHQSxHQUFHQSxDQUFDQSxPQUFPQSxHQUFHQSxNQUFNQSxHQUFHQSxHQUFHQSxDQUFDQSxLQUFLQSxDQUFDQTtRQUNwREEsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0E7UUFFMUJBLElBQUlBLElBQUlBLEdBQUdBLElBQUlBLG9CQUFRQSxFQUFFQSxDQUFDQTtRQUMxQkEsSUFBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsWUFBWUEsQ0FBQ0E7UUFDekJBLGVBQU9BLEVBQUVBLENBQUNBLFdBQVdBLENBQUNBLE9BQU9BLEdBQUdBLElBQUlBLENBQUNBO0lBQ3pDQSxDQUFDQSxDQUFDQSxDQUFDQTtBQUNQQSxDQUFDQTtBQWhCZSxrQkFBVSxhQWdCekIsQ0FBQSJ9