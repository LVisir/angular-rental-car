import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.css']
})
export class CustomTableComponent implements OnInit {

  @Input() mappingFunction!: (object: any) => Map<any, any>;
  @Input() keyObjectOrder!: () => number;
  @Input() list!: any[];
  @Input() tableHeaders!: string[];
  @Input() currentPage!: number;
  @Input() currentPages!: number[];
  @Input() dataSize!: number;

  constructor() { }

  ngOnInit(): void {
  }

}
