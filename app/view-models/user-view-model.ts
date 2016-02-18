import http = require("http");
import {Observable, EventData} from "data/observable";
import validator = require("email-validator");

export class UserViewModel extends Observable {
    
    public email = "";
    public password = "";

    public login() {
        
        var vm = this;
        
        return http.getJSON("https://httpbin.org/get")
            .then(function (r) {
                    // Argument (r) is JSON object!
                    console.log(JSON.stringify(r));
                }, function (e) {
                    // Argument (e) is Error!
                    vm.handleErrors(e);
                });
    }

    public register() {
        
        var vm = this;
        
        return http.getJSON("https://httpbin.org/get")
            .then(function (r) {
                    // Argument (r) is JSON object!
                    console.log(JSON.stringify(r));
                }, function (e) {
                    // Argument (e) is Error!
                    vm.handleErrors(e);
                });
    }

    public isValidEmail() {
        var email = this.get("email");
        return validator.validate(email);
    }
    
    private handleErrors(response) {
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }

}
