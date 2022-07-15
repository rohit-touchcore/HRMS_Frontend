import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { LeavesService } from '../leaves.service';
import { TableService } from 'src/app/table/table.service';

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.css'],
  providers: [LeavesService],
})
export class ApproveComponent implements OnInit {
  constructor(
    private leavesService: LeavesService,
    private tableService: TableService
  ) {}

  loading: boolean = false;
  leaves: Array<any> = [];
  message: string = '';
  filters: Array<any>;
  columns: Array<any> = [
    'Applied By',
    'Leave Start',
    'Leave End',
    'Status',
    'Reviewers',
    'Last Modified By',
    'Action',
  ];

  ngOnInit(): void {
    this.getLeavesToApprove();
  }

  getLeavesToApprove(): any {
    this.loading = true;
    this.filters = [
      {
        name: 'Search leaves',
        type: 'typehead',
        placeholder: 'Search a leave',
      },
      {
        name: 'Leave Status',
        type: 'dropdown',
        options: this.getLeaveStatus(),
      },
    ];
    this.tableService.setFilters(this.filters);
    this.leavesService
      .getLeavesToApprove()
      .then((res: any) => {
        console.log(res.data.leaveToApprove);
        this.convertData(res.data.leaveToApprove);
        this.loading = false;
      })
      .catch((error: any) => {
        console.log(error);
        this.loading = false;
      });
  }
  getLeaveStatus(): any {
    let statuses = Object.values(this.leavesService.leaveStatus);
    return statuses;
  }
  findLeaveStatus(status: number): any {
    let leaveStatus = ['CANCELLED', 'APPLIED', 'APPROVED', 'REJECTED'];
    return leaveStatus[status];
  }
  getLastModifiedBy(element: any): any {
    if (element.rejectedBy) {
      return element.rejectedBy.firstname + ' ' + element.rejectedBy.lastname;
    } else if (element.approvedBy) {
      return element.approvedBy.firstname + ' ' + element.approvedBy.lastname;
    } else {
      return '-';
    }
  }
  getActions(element: any): any {
    if (element.leaveStatus === 1) {
      return [
        { name: 'Approve', color: 'primary', button: 'raised' },
        { name: 'Reject', color: 'warn', button: 'raised' },
      ];
    }
  }
  convertData(data: Array<any>): void {
    this.leaves = data.map((element: any) => {
      return {
        id: element._id,
        'Applied By':
          element.appliedBy.firstname + ' ' + element.appliedBy.lastname,
        'Leave Start': moment(element.leaveStart).format('DD/MM/YY'),
        'Leave End': moment(element.leaveEnd).format('DD/MM/YY'),
        Status: this.findLeaveStatus(element.leaveStatus),
        Reviewers: element.reviewers.map(
          (el: any) => el.firstname + ' ' + el.lastname
        ),
        'Last Modified By': this.getLastModifiedBy(element),
        Action: this.getActions(element),
      };
    });
    this.tableService.fetchLeaves.next(this.leaves);
  }

  captureAction(event: { details: any; leaveid: string }): any {
    this.loading = true;
    if (event.details.name == 'Approve') {
      this.leavesService
        .approveLeave(event.leaveid.toString())
        .then((res: any) => {
          this.getLeavesToApprove();
          this.message = res.message;
          this.loading = false;
        });
    }
    if (event.details.name == 'Reject') {
      this.leavesService
        .rejectLeave(event.leaveid.toString())
        .then((res: any) => {
          this.getLeavesToApprove();
          this.message = res.message;
          this.loading = false;
        });
    }
  }

  emptyMessages(event: string): void {
    this.message = event;
  }
}
