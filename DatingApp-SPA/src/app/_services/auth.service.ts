import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper = new JwtHelperService();
  decodedToken: any;
  baseUrl: string = "http://localhost:5000/api/auth/";

  constructor(private http: HttpClient) { }

  // calls the login method in the API
  login(model: any) {

    // issue a request
    // model = body of request = username and password from the user
    // because I am sending a post I need to tell the API what
    // type of content (angular/json in my case) I am sending out.
    // map()
    //  - RXJS function
    //  - is used for transforming the servers's response into something else
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;

        console.log("-------User Log-------");
        console.log(user);

        if (user) {
          // save the token into the local storage with key 'token'
          localStorage.setItem("token", user.token);
          // console.log(localStorage);
          this.decodedToken = this.jwtHelper.decodeToken(user.token);

          console.log("---------Decoded Token----------");
          console.log(this.decodedToken);
        }
      })
    )
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }

  //  a JWT exists in local storage,
  //  and if it does, whether it has expired or not.
  loggedIn() {
    var token = localStorage.getItem('token');

    

    // isTokenExpired returns true if:
    // 01. the token is expired
    // 02. there is no token or any other problem
    return !this.jwtHelper.isTokenExpired(token);
  }
}
