import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = "http://localhost:51873/api/auth/";

  constructor(private http: HttpClient) { }

  login(model: any) {

    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;

        console.log("-------User Log-------");
        console.log(user);

        if (user) {
          localStorage.setItem("token", user.token);
          console.log(localStorage);
        }
      })
    )
  }

  register(model: any){
    return this.http.post(this.baseUrl+'register', model);
  }
}
