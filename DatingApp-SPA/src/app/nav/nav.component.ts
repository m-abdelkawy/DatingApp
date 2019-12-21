import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  // model: any = {username:"", password:""};
  model: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  hamada(){
    console.log("Form Submitted");
  }

  login(){
    this.authService.login(this.model).subscribe(next=>{
      console.log("Login Successful");
    }, error=>{
      console.log("Error logging in!")
    });
  }

  isLoggedIn(){
    const token = localStorage.getItem("token");
    return !!token;
  }

  logout(){
    localStorage.removeItem('token');
    console.log("Logged out");
  }
}
