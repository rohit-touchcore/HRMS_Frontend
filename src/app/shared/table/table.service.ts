import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable()
export class TableService {
  constructor() {}
  isOpened: boolean = false;
  fetchLeaves: EventEmitter<any> = new EventEmitter();
  searchLeave: EventEmitter<any> = new EventEmitter();
  filterLeave: EventEmitter<any> = new EventEmitter();
  filters: Array<any> = [];
  toggleOpen(): void {
    this.isOpened = !this.isOpened;
  }
  setFilters(filters: Array<any>): any {
    this.filters = filters;
  }
  getFilters(): any {
    return this.filters;
  }
}
