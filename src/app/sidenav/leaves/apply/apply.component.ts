import { Component, OnInit } from '@angular/core';
import { LeavesService } from '../leaves.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import * as moment from 'moment';
import { LoginService } from 'src/app/login/auth.service';
import { DialogService } from 'src/app/dialog/dialog.service';

@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css'],
  providers: [LeavesService],
})
export class ApplyComponent implements OnInit {
  constructor(
    private leavesService: LeavesService,
    private loginService: LoginService,
    private dialogService: DialogService
  ) {}
  managers: any = [];
  selected: '';
  selectedManagers: Array<{ name: string; id: string }> = [];
  startDate: any;
  endDate: any;
  message: string = '';
  loading: boolean = false;
  dialogRef: any;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  ngOnInit(): void {
    this.loading = true;
    this.dialogService.dialog.subscribe((data: any) => {
      this.dialogRef = data;
    });
    if (!this.managers.length) {
      this.leavesService
        .getAllManagers()
        .then((res: any) => {
          this.managers = res.data;
          this.loading = false;
        })
        .catch((err: any) => {
          console.log(err);
          this.loading = false;
        });
    }
  }
  pushManager(event: any) {
    if (event.value) {
      let index = this.selectedManagers.findIndex(
        (el) => el.id === event.value._id
      );
      if (index === -1) {
        this.selectedManagers.push({
          id: event.value._id,
          name: event.value.firstname + ' ' + event.value.lastname,
        });
      }
    }
  }
  remove(manager: { name: string; id: string }): void {
    const index = this.selectedManagers.findIndex(
      (ele: { name: string; id: string }) => ele.id === manager.id
    );

    if (index >= 0) {
      this.selectedManagers.splice(index, 1);
    }
  }
  applyLeave(): void {
    this.loading = true;
    let user = this.loginService.getUser();
    let managerIds = this.selectedManagers.map((el) => el.id);
    let data = {
      userid: user.id,
      managerids: managerIds,
      startdate: moment(this.startDate).format('DD-MM-YYYY'),
      enddate: moment(this.endDate).format('DD-MM-YYYY'),
    };
    this.leavesService
      .ApplyLeaves(data)
      .then((res: any) => {
        this.message = res.message;
        setTimeout(() => {
          this.dialogRef.close();
          this.loading = false;
        }, 200);
      })
      .catch((err: any) => {
        console.log(err);
        this.message = 'Something went wrong please try again later.';
        this.loading = false;
      });
  }
  emptyMessages(event: string): void {
    this.message = event;
  }
}
