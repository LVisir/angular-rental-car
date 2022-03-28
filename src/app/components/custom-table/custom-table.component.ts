import {Component, Input, OnInit} from '@angular/core';
import { faAngleDown, faFilter, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import {HeaderTableDatabase} from "../../../interfaces/HeaderTableDatabase";
import {User} from "../../../interfaces/User";

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.css']
})
export class CustomTableComponent implements OnInit {

  faAngleDown = faAngleDown;
  faFilter = faFilter;
  faAngleUp = faAngleUp;

  str: string = '-idBooking';

  console = console;

  object = Object;

  @Input() mappingFunction!: (object: any) => Map<any, any>;
  @Input() keyObjectOrder!: () => number;
  @Input() forward!: (page: number, currentPages: number[], currentPage: number) => void;
  @Input() backward!: (page: number, currentPages: number[], currentPage: number) => void;
  @Input() changePage!: (newPage: number) => void;
  @Input() list!: any[];
  @Input() tableDbHeaders!: HeaderTableDatabase[];
  @Input() currentPage!: number;
  @Input() currentPages!: number[];
  @Input() dataSize!: number;
  @Input() sortMethod!: (arr: any[], keyArr: string[], reverse: boolean) => any[];
  @Input() changeOrderState!: (state: number) => number;
  @Input() numberOfActions!: number;

  resetAllOthersOrderType(headerTableDb: HeaderTableDatabase[], name: string): void {
    for(let key in headerTableDb){
      if(headerTableDb[key].headerTable !== name){
        headerTableDb[key].state = 0;
      }
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
