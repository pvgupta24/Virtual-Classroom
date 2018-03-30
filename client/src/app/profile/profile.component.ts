import { Component } from '@angular/core';
import { AuthenticationService, UserDetails } from '../authentication.service';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  details: UserDetails;
  editNow: Boolean = false;
  // details = {
  //   dob:"",
  //   gender:"",
  //   education:"",
  //   phone:"",
  //   email:""
  // }

  constructor(private auth: AuthenticationService, private router: Router, private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  ngOnInit() {    
    this.auth.profile().subscribe(user => {
      this.details = user;
      //Log the user details
      console.log(user);
    }, (err) => {
      console.error(err);
    });
  }
  // fields = [];
  // values = [];

  editProfile() {
    console.log("Profile is being edited");
    console.log(this.details.dob);
    console.log(this.details.gender);
    console.log(this.details.education);
    console.log(this.details.phone);
    console.log(this.details.email);
    this.http.post('/api/editProfile',JSON.stringify(this.details), this.httpOptions)
    .subscribe(res => console.log(res));
    // this.router.navigateByUrl('/newCourse');
  }
}
