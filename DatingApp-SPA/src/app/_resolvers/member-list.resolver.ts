import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { UserService } from "../_services/user.service";
import { AlertifyService } from "../_services/alertify.service";
import { Observable, of } from "rxjs";
import { User } from "../_models/user";
import { catchError } from "rxjs/operators";

@Injectable()
export class MemberListResolver implements Resolve<User[]> {

    constructor(private userServise: UserService, private alertify: AlertifyService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<User[]>{
        return this.userServise.getUsers().pipe(
            catchError(error=>{
                this.router.navigate(['/home']);
                this.alertify.error("Error Loading Users' data!");
                return of(null);
            })
        )
    }
}