import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFire, FirebaseAuthState } from 'angularfire2';
import { AuthUser } from '../model/user';

@Injectable()
export class AuthService {

    private authUser: AuthUser;
    private authorized: boolean;

    constructor(private af: AngularFire, private router: Router) {
    }

    public getAuthUser(): Observable<AuthUser> {
        if (this.authUser === undefined) {
            console.trace('#getAuthUser();');
            return this.af.auth.first().map((authState: FirebaseAuthState) => {
                this.authUser = (authState != null && authState.auth !== undefined) ? authState.auth : null;
                console.trace('#getAuthUser(); authUser=', this.authUser);
                return this.authUser;
            });
        }

        return Observable.from([this.authUser]);
    }

    public isAuthorized(): Observable<boolean> {
        if (this.authorized === undefined) {
            console.trace('#isAuthorized();');
            return this.af.auth.first().map((authState: FirebaseAuthState) => {
                this.authorized = authState != null && authState.auth !== undefined;
                console.trace(`#isAuthorized(); authorized=${this.authorized}`);
                return this.authorized;
            });
        }

        return Observable.from([this.authorized]);
    }

    public login() {
        this.af.auth.login();
    }

    public logout() {
        this.af.auth.logout();
        this.router.navigate(['/']);
    }

}