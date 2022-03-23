import { Component, OnInit } from '@angular/core';
import {Vehicle} from "../../../interfaces/Vehicle";
import {VehicleService} from "../../services/vehicle.service";
import {delay} from "rxjs";
import {TableConfigService} from "../../services/table-config.service";

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  vehiclesList: Vehicle[] = [];
  vehicleTableHeaders: string[] = [];
  currentPage!: number;
  errorMessage: string = '';
  currentPages: number[] = [];
  dataSize!: number;

  constructor(private vehicleService: VehicleService, private tableConfigService: TableConfigService) { }

  ngOnInit(): void {

    this.vehicleTableHeaders = ['License plate', 'Model', 'Typology', 'Manufacturer', 'Registration year', 'Vehicle Id'];

    this.vehicleService.getVehicles()
      .pipe(
        delay(1000)
      )
      .subscribe({
        next: vehicles => {
          this.vehiclesList = vehicles;
          this.currentPage = vehicles.length > 0 ? 1 : 0;
          this.currentPages = this.tableConfigService.getCurrentPages(vehicles.length);
          this.dataSize = Math.floor(vehicles.length/10);
        },
        error: err => {
          this.errorMessage = err.error.error;
        }
      })

  }

  mapping(vehicle: Vehicle): Map<any,any> {
    const mapObj = new Map();
    mapObj.set('licensePlate', vehicle.licensePlate);
    mapObj.set('model', vehicle.model);
    mapObj.set('typology', vehicle.typology);
    mapObj.set('manufacturer', vehicle.manufacturer);
    mapObj.set('registrYear', vehicle.registrYear);
    mapObj.set('idVehicle', vehicle.idVehicle);

    return mapObj;

  }

  /**
   * function to normal key property order for keyvalue pipe
   */
  returnZero(): number {
    return 0
  }

}
