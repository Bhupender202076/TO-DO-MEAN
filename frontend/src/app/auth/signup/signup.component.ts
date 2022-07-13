import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { AuthData } from "../Auth-data.model";
import { AuthService } from "../auth.service";

@Component({
    selector: "app-signup",
    templateUrl: "./signup.component.html",
    styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
    isLoading = false;
    private authListenerSubs: Subscription;
    constructor(public authService: AuthService) {}

    ngOnInit(): void {
        this.authListenerSubs = this.authService
            .getAuthStatusListener()
            .subscribe((isAuthenticated) => {
                this.isLoading = isAuthenticated;
            });
    }

    onSignup(form: NgForm) {
        if (form.invalid) {
            return;
        }

        this.isLoading = true;
        const auth: AuthData = {
            email: form.value.email,
            password: form.value.password,
        };
        this.authService.createUser(auth);
    }
    ngOnDestroy() {
        this.authListenerSubs.unsubscribe();
    }
}
