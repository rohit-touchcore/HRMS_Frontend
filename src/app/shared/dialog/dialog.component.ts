import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogService } from './dialog.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  constructor(
    private matDialog: MatDialog,
    private dialogService: DialogService
  ) {}
  ngOnInit(): void {}

  openDialog(Component: any) {
    const dialogConfig = new MatDialogConfig();
    let dialogRef = this.matDialog.open(Component, dialogConfig);
    dialogRef.afterOpened().subscribe((result: any) => {
      this.dialogService.dialog.next(dialogRef);
    });
  }
}
