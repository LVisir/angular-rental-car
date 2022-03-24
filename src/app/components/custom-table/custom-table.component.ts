import {Component, Input, OnInit} from '@angular/core';
import {TableConfigService} from "../../services/table-config.service";

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.css']
})
export class CustomTableComponent implements OnInit {

  @Input() mappingFunction!: (object: any) => Map<any, any>;
  @Input() keyObjectOrder!: () => number;
  @Input() forward!: (page: number, currentPages: number[], currentPage: number) => void;
  @Input() backward!: (page: number, currentPages: number[], currentPage: number) => void;
  @Input() changePage!: (newPage: number) => void;
  @Input() list!: any[];
  @Input() tableHeaders!: string[];
  @Input() currentPage!: number;
  @Input() currentPages!: number[];
  @Input() dataSize!: number;

  constructor(private tableConfigService: TableConfigService) { }

  ngOnInit(): void {
  }

}
