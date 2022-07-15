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
  columns: Array<any> = [
    'Leave Start',
    'Leave End',
    'Status',
    'Reviewers',
    'Last Modified By',
    'Action',
  ];
  leaves: Array<any> = [];
  Component: any = ApplyComponent;
  loading: boolean = false;
  dialogRef: any;
  message: string = '';
  filters: Array<any>;

  ngOnInit(): any {
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
    this.dialogService.dialog.subscribe((data: any) => {
      this.dialogRef = data;
      this.dialogRef.afterClosed().subscribe((result: any) => {
        this.getLeavesHistory();
      });
    });
    this.getLeavesHistory();
  }
  findLeaveStatus(status: any): any {
    let leaveStatus = this.leavesService.getStatus(status);
    return leaveStatus;
  }
  getLeavesHistory(): void {
    this.loading = true;
    this.leavesService
      .getAllLeaves()
      .then((res: any) => {
        this.convertData(res.data);
        console.log(res.data);
        this.loading = false;
      })
      .catch((err: any) => {
        this.loading = false;
        console.log(err);
      });
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
      return [{ name: 'Cancel', color: 'warn', button: 'stroked' }];
    }
  }
  searchData(searchString: any) {
    this.tableService.searchLeave.next(searchString.target.value);
  }
  filterData(filterValue: any) {
    console.log(filterValue);
    this.tableService.filterLeave.next(filterValue);
  }
  getLeaveStatus(): any {
    let statuses = Object.values(this.leavesService.leaveStatus);
    return statuses;
  }
  convertData(data: Array<any>): void {
    this.leaves = data.map((element: any) => {
      return {
        id: element._id,
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
