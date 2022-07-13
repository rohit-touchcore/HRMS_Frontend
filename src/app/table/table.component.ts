import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { TableService } from './table.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  constructor(private tableService: TableService) {}
  dataSource: MatTableDataSource<any>;
  @Input() displayedColumns: Array<string>;
  @Output() button:EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('paginator') paginator: MatPaginator;

  ngOnInit(): void {
    this.tableService.fetchLeaves.subscribe((leave: Array<any>) => {
      console.log('leave', leave);
      let finalLeaves = leave.reverse();
      this.dataSource = new MatTableDataSource(finalLeaves);
      this.dataSource.paginator = this.paginator;
    });
  }
  buttonPressed(action: any,item:string): any {
    let data = {
      details: item,
      leaveid: action.id,
    };
    this.button.emit(data);
  }
}
