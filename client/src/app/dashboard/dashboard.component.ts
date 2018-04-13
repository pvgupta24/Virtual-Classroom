import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../authentication.service';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  /*selector: 'app-dashboard',*/
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
  user: UserDetails;
  courses : Object[] = []
  newcourse = {
    code:"",
    name:"",
    owner:""
  };
  find = false;
  list:Object = [];

  constructor(private auth: AuthenticationService, private router: Router, private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  ngOnInit() {    
    this.auth.profile().subscribe(user => {
      this.user = user;
      //Log the user details
      console.log(user.courses);
      //Load MyCourses
      for (var course in user.courses){

        console.log("Requesting "+ user.courses[course]);
        this.http.get('/api/courseDetails/'+ user.courses[course] ,this.httpOptions)
        .subscribe(res => {
          console.log(res);
          this.courses.push(res);
        });
      }
      this.newcourse.owner = user.email;
    }, (err) => {
      console.error(err);
    });
    
  }
  newCourse() {    
    console.log("New course is being created");
    this.http.post('/api/newCourse',
    JSON.stringify({"name":this.newcourse.name,
     "code":this.newcourse.code,
     "owner":this.newcourse.owner}), this.httpOptions)
    .subscribe(res => console.log(res));
    // this.router.navigateByUrl('/newCourse');
  }

  allCourses(){
    console.log("Getting All Courses");
    this.http.get('/api/allCourses/' ,this.httpOptions)
      .subscribe(res => {
        console.log(res);
        this.list = res;
        this.find = true;
      });
  }

}
