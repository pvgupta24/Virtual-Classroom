import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

//let jitsi = require('https://meet.jit.si/external_api.js');
declare function JitsiMeetExternalAPI(a,b): void;

@Component({
  // selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  courseCode
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe( params => this.courseCode=params.courseCode );
    console.log("Course is "+ this.courseCode);
  }
  ngOnInit() {
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
}
