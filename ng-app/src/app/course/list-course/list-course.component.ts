import { Component, OnInit } from '@angular/core';
import {Course} from '../../students/course';
import {CourseServerService} from '../../service/course-server.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {StudentsDataService} from "../../service/students-data.service";

@Component({
  selector: 'app-list-course',
  templateUrl: './list-course.component.html',
  styleUrls: ['./list-course.component.css']
})
export class ListCourseComponent implements OnInit {

  courses:Course[];
  constructor(private courseService:CourseServerService, private studentDataService: StudentsDataService, private route:ActivatedRoute, private router: Router) { }

  result:string;
  ngOnInit() {
    this.route.queryParams
      .subscribe((params : Params) => {
      this.result = params['result'];
    });

    this.studentDataService.getStudentsData()
      .subscribe((a) => {},
        (error : Error) => {
          console.log(error);
          if(error.message === 'UnAuthorize') {
            this.router.navigate(['login'], {queryParams:{source: 'courses'}});
          }
        });

    this.courseService.getCourse()
      .subscribe(courses=>this.courses = courses);


  }

}
