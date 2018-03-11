import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  /*selector: 'app-dashboard',*/
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  user: UserDetails;

  constructor(private auth: AuthenticationService, private router: Router) {}
  
  ngOnInit() {    
    this.auth.profile().subscribe(user => {
      this.user = user;
      //Log the user details
      console.log(user);
    }, (err) => {
      console.error(err);
    });
  }
  newCourse() {
      this.router.navigateByUrl('/newCourse');
  }
}
