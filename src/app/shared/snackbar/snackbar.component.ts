import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
})
export class SnackbarComponent implements OnInit {
  constructor(private _snackBar: MatSnackBar) {}

  @Input() error = '';
  @Input() action = '';
  @Output() messageEmit = new EventEmitter<string>();
  snackRef: any;

  ngOnInit(): void {
    this.openSnackBar(this.error, this.action);
    this.snackRef.afterDismissed().subscribe(() => {
      this.messageEmit.emit('');
    });
  }
  openSnackBar(message: string, action: string) {
    this.snackRef = this._snackBar.open(message, action, { duration: 5000 });
  }
}
