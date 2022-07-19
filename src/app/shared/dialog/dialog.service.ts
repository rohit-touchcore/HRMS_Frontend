import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable()
export class DialogService {
  constructor() {}
  dialog: EventEmitter<any> = new EventEmitter();
}
