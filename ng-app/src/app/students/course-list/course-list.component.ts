import {Component, Input} from '@angular/core';
import {Student} from '../student';
import {Course} from '../course';
import {StudentsDataService} from "../../service/students-data.service";
import {Router} from '@angular/router';


@Component({
 selector: 'course-list',
 templateUrl: './course-list.component.html',
 styleUrls:['./course-list.component.css']
})
export class CourseListComponent {
  constructor(private router: Router, private studentDataService: StudentsDataService) {}

  @Input() count:number;
  @Input('enrolledCourse') courses:Course;
  ngOnInit() {
  }

}
