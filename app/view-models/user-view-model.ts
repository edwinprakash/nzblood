import http = require("http");
import {Observable, EventData} from "data/observable";
import validator = require("email-validator");
import Sqlite = require("nativescript-sqlite");

export class UserViewModel extends Observable {

    public dbname = "nzblood.sqlite";
    public db = null;

    public email = "";
    public password = "";

    public login() {
        var data;
        this.db.get("select email, pin from users where email=?", [this.email], function(err, row){
            if (err) {
                console.error("Error:", err.message)
                data = err;
            }
            data = row;
        });
        return data;
    }

    public register() {
        var id = this.db.execSQL("insert into users (email, pin) values (?, ?)", [this.email, this.password]);
        console.info(id);
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