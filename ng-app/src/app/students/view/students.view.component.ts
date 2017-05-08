import {Component} from '@angular/core';
import {Student} from '../student';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {StudentsDataService} from "../../service/students-data.service";
import 'rxjs/add/operator/switchMap';
@Component({
  selector: 'students-view',
  templateUrl: './students.view.component.html',
  styleUrls: ['./students.view.component.css']
})
export class StudentsViewComponent {
  constructor(private router: Router, private route: ActivatedRoute, private studentDataService: StudentsDataService) {
  }

  student: Student;
  isNoData: boolean;
  inputCount: number;

  ngOnInit() {
    this.isNoData = false;
    this.inputCount = 15;
    this.route.params
      .switchMap((params: Params) => this.studentDataService.getStudent(+params['id']))
      .subscribe((student: Student) => {
          if (student !== null)
            this.student = student;
          else
            this.isNoData = true;
        }
        ,
        (error : Error) => {
          if(error.message === 'UnAuthorize') {
            this.router.navigate(['login'], {queryParams: {source: 'view'}});
          }
        }
      );
  }
}
