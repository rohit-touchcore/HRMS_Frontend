import { Component, OnInit } from '@angular/core';
import { LeavesService } from '../leaves.service';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.css'],
  providers: [LeavesService],
})
export class ApproveComponent implements OnInit {
  constructor(private leavesService: LeavesService) {}
  message: string = '';
  loading: boolean = false;
  leavesToApprove: Array<any> = [];
  baseUrl: string = '';
  ngOnInit(): void {
    this.baseUrl = environment.IMAGE_URL;
    this.getLeavesToApprove();
  }
  getLeavesToApprove(): any {
    this.loading = true;
    this.leavesService
      .getLeavesToApprove()
      .then((res: any) => {
        this.leavesToApprove = res.data.leaveToApprove.map((el: any) => {
          return {
            ...el,
            leaveStart: moment(el.leaveStart).format('DD/MM/YYYY'),
            leaveEnd: moment(el.leaveEnd).format('DD/MM/YYYY'),
          };
        });
        this.loading = false;
        console.log(this.leavesToApprove);
      })
      .catch((err: any) => {
        this.loading = false;
      });
  }
  approve(event: any): any {
    this.loading = true;
    this.leavesService
      .approveLeave(event)
      .then((res: any) => {
        this.loading = false;
        this.message = res.message;
        this.getLeavesToApprove();
      })
      .catch((err: any) => {
        this.loading = false;
        this.message = 'Something went wrong please try again later';
      });
  }
  reject(event: any): any {
    this.loading = true;
    this.leavesService
      .rejectLeave(event)
      .then((res: any) => {
        this.loading = false;
        this.message = res.message;
        this.getLeavesToApprove();
      })
      .catch((err: any) => {
        this.loading = false;
        this.message = 'Something went wrong please try again later';
      });
  }
  emptyMessages(event: any): void {
    this.message = event;
  }
}
