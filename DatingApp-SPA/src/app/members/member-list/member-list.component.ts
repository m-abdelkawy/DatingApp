import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { User } from '../../_models/user';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  users: User[];
  constructor(private userService: UserService, private alertifyService: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    // this.loadUsers();
    this.route.data.subscribe(data=>{
      this.users = data.users;
      console.log(data);
    })
  }

  // loadUsers(){
  //   this.userService.getUsers().subscribe(data=>{
  //     this.users = data;
  //   }, error=>{
  //     this.alertifyService.error(error);
  //   });
  // }
}
