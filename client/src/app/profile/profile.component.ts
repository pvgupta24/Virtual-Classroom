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
  newProfile = {
    dob:"",
    gender:"",
    education:"",
    phone:"",
    email:""
  }

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
    console.log(this.newProfile.dob);
    console.log(this.newProfile.gender);
    console.log(this.newProfile.education);
    console.log(this.newProfile.phone);
    console.log(this.newProfile.email);
    this.http.post('/api/editProfile',
    JSON.stringify({"dob":this.newProfile.dob,
      "gender":this.newProfile.gender,
      "education":this.newProfile.education,
      "mob":this.newProfile.phone,
      "email":this.newProfile.email}), this.httpOptions)
    .subscribe(res => console.log(res));
    // this.router.navigateByUrl('/newCourse');
  }
}
