import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { AuthenticationService, UserDetails } from '../authentication.service';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';

//let jitsi = require('https://meet.jit.si/external_api.js');
declare function JitsiMeetExternalAPI(a,b): void;

@Component({
  // selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  user: UserDetails;
  courseCode
  courseName
  courseSyllabus = "";
  constructor(private route: ActivatedRoute, private auth: AuthenticationService, private router: Router, private http: HttpClient) {
    this.route.params.subscribe( params => { 
      this.courseCode=params.courseCode, 
      this.courseName=params.courseName  });
    console.log("Course is "+ this.courseCode);
  }
  ngOnInit() {    
    this.auth.profile().subscribe(user => {
      this.user = user;
    }, (err) => {
      console.error(err);
    });
    
  }
  startSession(){
    console.log("Connecting to live class ");
    var domain = "meet.jit.si";
    var options = {
        roomName: "VirtualClassroom-"+this.courseCode,// +"somerandom",
        width: 700,
        height: 600,
        parentNode: document.querySelector('#meet')
    }
    var api = new JitsiMeetExternalAPI(domain, options);
    
  }
  sendMessage() {
    
  }
}
