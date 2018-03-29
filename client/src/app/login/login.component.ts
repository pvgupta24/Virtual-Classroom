import { Component } from '@angular/core';
import { AuthenticationService, TokenPayload, UserDetails } from '../authentication.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  credentials: TokenPayload = {
    email: '',
    password: ''
  };
  emailForPassword;

  constructor(private auth: AuthenticationService, private router: Router, private http: HttpClient) {}

  login() {
    this.auth.login(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/profile');
    }, (err) => {
      console.error(err);
    }); 
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  mailPassword() {
    console.log("Email for password: " + this.emailForPassword);
    this.http.post('/api/forgotPassword',
    JSON.stringify({"email":this.emailForPassword}), this.httpOptions)
    .subscribe(res => console.log(res));
    // this.router.navigateByUrl('/newCourse');
    
  }
}
