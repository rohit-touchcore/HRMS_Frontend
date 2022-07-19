import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { TableService } from './table.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  constructor(public tableService: TableService) {}
  dataSource: MatTableDataSource<any>;
  filterValue: any;
  filters: Array<any>;
  searchValue: any;
  tableShow: boolean = true;
  @Input() displayedColumns: Array<string>;
  @Output() button: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('paginator') paginator: MatPaginator;

  ngOnInit(): void {
    this.filters = this.tableService.getFilters();
    this.tableService.fetchLeaves.subscribe((leave: Array<any>) => {
      if (!leave.length) {
        this.tableShow = false;
      }
      let finalLeaves = leave.reverse();
      this.dataSource = new MatTableDataSource(finalLeaves);
      this.dataSource.paginator = this.paginator;
    });
  }

  searchData(searchString: any) {
    this.searchValue = searchString.target.value.trim();
    this.searchValue = this.searchValue.toLowerCase();
    this.dataSource.filter = this.searchValue;
  }
  filterData(filterOption: any) {
    this.filterValue = filterOption.source.value.toString();
    if (this.filterValue == 'NONE') {
      return;
    }
    this.filterValue = this.filterValue.trim();
    this.filterValue = this.filterValue.toLowerCase();
    this.dataSource.filter = this.filterValue;
  }

  onToggle(): void {
    this.tableService.toggleOpen();
  }
  buttonPressed(action: any, item: string): any {
    let data = {
      details: item,
      leaveid: action.id,
    };
    this.button.emit(data);
  }
}
