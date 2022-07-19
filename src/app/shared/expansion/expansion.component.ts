import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-expansion',
  templateUrl: './expansion.component.html',
  styleUrls: ['./expansion.component.css'],
})
export class ExpansionComponent implements OnInit {
  @Input() option: any = null;
  panelOpenState: boolean = false;
  constructor() {}

  ngOnInit(): void {
  }
}
