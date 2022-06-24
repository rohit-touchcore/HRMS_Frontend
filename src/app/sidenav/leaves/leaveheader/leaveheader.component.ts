import { Component, OnInit } from '@angular/core';
import { LeavesService } from '../leaves.service';
@Component({
  selector: 'app-leaveheader',
  templateUrl: './leaveheader.component.html',
  styleUrls: ['./leaveheader.component.css'],
  providers: [LeavesService],
})
export class LeaveheaderComponent implements OnInit {
  constructor(public leavesService: LeavesService) {}

  ngOnInit(): void {}
}
