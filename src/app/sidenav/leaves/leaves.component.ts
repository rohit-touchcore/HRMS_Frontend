import { Component, OnInit, Input } from '@angular/core';
import { LeavesService } from './leaves.service';
import * as moment from 'moment';
import { ApplyComponent } from './apply/apply.component';
import { TableService } from 'src/app/table/table.service';
import { DialogService } from 'src/app/dialog/dialog.service';
@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.css'],
  providers: [LeavesService, ApplyComponent],
})
export class LeavesComponent implements OnInit {
  constructor(
    private leavesService: LeavesService,
    public applyComponent: ApplyComponent,
    private tableService: TableService,
    private dialogService: DialogService
  ) {}
  leaves: Array<any> = [];
  columns: Array<any> = [
    'Leave Start',
    'Leave End',
    'Status',
    'Reviewers',
    'Approved By',
    'Rejected By',
    'Action',
  ];
  Component: any = ApplyComponent;
  loading: boolean = false;
  dialogRef: any;
  message: string = '';

  ngOnInit(): any {
    this.dialogService.dialog.subscribe((data: any) => {
      this.dialogRef = data;
      this.dialogRef.afterClosed().subscribe((result: any) => {
        this.getLeavesHistory();
      });
    });
    this.getLeavesHistory();
  }
  findLeaveStatus(status: number): any {
    let leaveStatus = ['CANCELLED', 'APPLIED', 'APPROVED', 'REJECTED'];
    return leaveStatus[status];
  }
  getLeavesHistory(): void {
    console.log('hey');
    this.loading = true;
    this.leavesService
      .getAllLeaves()
      .then((res: any) => {
        this.convertData(res.data);
        this.loading = false;
      })
      .catch((err: any) => {
        this.loading = false;
        console.log(err);
      });
  }
  convertData(data: Array<any>): void {
    this.leaves = data.map((element: any) => {
      if (
        element.hasOwnProperty('approvedBy') &&
        !element.hasOwnProperty('rejectedBy') &&
        element.leaveStatus !== 0
      ) {
        return {
          id: element._id,
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
      } else if (
        element.hasOwnProperty('rejectedBy') &&
        !element.hasOwnProperty('approvedBy') &&
        !element.hasOwnProperty('rejectedBy') &&
        element.leaveStatus !== 0
      ) {
        return {
          id: element._id,
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
      } else if (
        element.leaveStatus === 0 &&
        !element.hasOwnProperty('approvedBy') &&
        !element.hasOwnProperty('rejectedBy')
      ) {
        return {
          id: element._id,
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
      } else {
        return {
          id: element._id,
          'Leave Start': moment(element.leaveStart).format('DD/MM/YY'),
          'Leave End': moment(element.leaveEnd).format('DD/MM/YY'),
          Status: this.findLeaveStatus(element.leaveStatus),
          Reviewers: element.reviewers.map(
            (el: any) => el.firstname + ' ' + el.lastname
          ),
          'Approved By': '-',
          'Rejected By': '-',
          Action: [{ name: 'Cancel', color: 'warn', button: 'stroked' }],
        };
      }
    });
    this.tableService.fetchLeaves.next(this.leaves);
  }
  captureAction(event: { details: any; leaveid: string }): any {
    if (event.details.name == 'Cancel') {
      this.loading = true;
      this.leavesService
        .cancelLeave(event.leaveid.toString())
        .then((res: any) => {
          this.getLeavesHistory();
          this.message = res.message;
          this.loading = false;
        });
    }
  }
  emptyMessages(event: string): void {
    this.message = event;
  }
}
