import { Injectable } from '@angular/core';
import { TableFieldInfo } from '../../classes/TableFieldInfo';

@Injectable({
  providedIn: 'root'
})
export class TableConfigService {

  private _dbFields!: string[];
  private _tableHeaders!: string[];
  private _dataSize!: number;
  private _currentPage!: number;
  private _currentPages!: number[];
  private _searchableFields!: string[];
  private _searchText!: string;
  private _filterSearchText!: string;
  private _list!: any[];
  private _searchButtonClicked!: boolean;
  private _disableResetHeaderButton!: boolean;
  private _disableResetPaginationButton!: boolean;
  private _disableResetTableButton!: boolean;
  private _fieldObjects!: TableFieldInfo[];

  get dbFields(): string[] {
    return this._dbFields;
  }

  set dbFields(value: string[]) {
    this._dbFields = value;
  }

  get tableHeaders(): string[] {
    return this._tableHeaders;
  }

  set tableHeaders(value: string[]) {
    this._tableHeaders = value;
  }

  get dataSize(): number {
    return this._dataSize;
  }

  set dataSize(value: number) {
    this._dataSize = value;
  }

  get currentPage(): number {
    return this._currentPage;
  }

  set currentPage(value: number) {
    this._currentPage = value;
  }

  get currentPages(): number[] {
    return this._currentPages;
  }

  set currentPages(value: number[]) {
    this._currentPages = value;
  }

  get searchableFields(): string[] {
    return this._searchableFields;
  }

  set searchableFields(value: string[]) {
    this._searchableFields = value;
  }

  get searchText(): string {
    return this._searchText;
  }

  set searchText(value: string) {
    this._searchText = value;
  }

  get filterSearchText(): string {
    return this._filterSearchText;
  }

  set filterSearchText(value: string) {
    this._filterSearchText = value;
  }

  get list(): any[] {
    return this._list;
  }

  set list(value: any[]) {
    this._list = value;
  }

  get searchButtonClicked(): boolean {
    return this._searchButtonClicked;
  }

  set searchButtonClicked(value: boolean) {
    this._searchButtonClicked = value;
  }

  get disableResetHeaderButton(): boolean {
    return this._disableResetHeaderButton;
  }

  set disableResetHeaderButton(value: boolean) {
    this._disableResetHeaderButton = value;
  }

  get disableResetPaginationButton(): boolean {
    return this._disableResetPaginationButton;
  }

  set disableResetPaginationButton(value: boolean) {
    this._disableResetPaginationButton = value;
  }

  get disableResetTableButton(): boolean {
    return this._disableResetTableButton;
  }

  set disableResetTableButton(value: boolean) {
    this._disableResetTableButton = value;
  }

  get fieldObjects(): TableFieldInfo[] {
    return this._fieldObjects;
  }

  set fieldObjects(value: TableFieldInfo[]) {
    this._fieldObjects = value;
  }

  constructor() { }
}
