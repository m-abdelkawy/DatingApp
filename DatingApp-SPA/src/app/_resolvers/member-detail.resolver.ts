import { Injectable } from '@angular/core';
import { User } from '../_models/user'
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from './../_services/user.service';
import { AlertifyService } from './../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberDetailResolver implements Resolve<User>{
    
    constructor(private userService: UserService, 
        private router: Router, 
        private alertify: AlertifyService){ }

    resolve(route: ActivatedRouteSnapshot) :Observable<User>{
        //resolve subscribes automatically to the method.
        //we need to catch any error that occurs so that we redirect the user back and get out of this particular method
        return this.userService.getUser(route.params.id).pipe(
            catchError(error=>{
                this.alertify.error('Problem retrieving data!');
                this.router.navigate(['/members']);
                return of(null); //observable of null (return out of this method if there is error)
                //in case there is no error we continue to the route we are activating
            })
        );
    }
}
