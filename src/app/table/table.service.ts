import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class TableService {
  constructor() {}
  fetchLeaves: EventEmitter<any> = new EventEmitter();
}
