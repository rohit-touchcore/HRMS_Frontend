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
  columns: Array<any> = [
    'Applied By',
    'Leave Start',
    'Leave End',
    'Status',
    'Reviewers',
    'Approved By',
    'Rejected By',
    'Action',
  ];
  message: string = '';

  ngOnInit(): void {
    this.getLeavesToApprove();
  }
  getLeavesToApprove(): any {
    this.loading = true;
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
  findLeaveStatus(status: number): any {
    let leaveStatus = ['CANCELLED', 'APPLIED', 'APPROVED', 'REJECTED'];
    return leaveStatus[status];
  }
  convertData(data: Array<any>): void {
    this.leaves = data.map((element: any) => {
      if (element.leaveStatus === 0) {
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
          'Approved By': '-',
          'Rejected By': '-',
          Action: 'NA',
        };
      }
      if (element.hasOwnProperty('approvedBy')) {
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
          'Approved By':
            element.approvedBy.firstname + ' ' + element.approvedBy.lastname,
          'Rejected By': '-',
          Action: 'NA',
        };
      }
      if (element.hasOwnProperty('rejectedBy')) {
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
          'Approved By': '-',
          'Rejected By':
            element.rejectedBy.firstname + ' ' + element.rejectedBy.lastname,
          Action: 'NA',
        };
      } else {
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
          'Approved By': '-',
          'Rejected By': '-',
          Action: [
            { name: 'Approve', color: 'primary', button: 'raised' },
            { name: 'Reject', color: 'warn', button: 'raised' },
          ],
        };
      }
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
