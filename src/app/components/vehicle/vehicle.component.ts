import { Component, OnInit } from '@angular/core';
import {Vehicle} from "../../../interfaces/Vehicle";
import {VehicleService} from "../../services/vehicle.service";
import {TableConfigService} from "../../services/table-config.service";
import {TableTools} from "../../../classes/TableTools";
import {TableFunctions} from "../../../interfaces/TableFunctions";

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent extends TableTools<Vehicle> implements OnInit, TableFunctions<Vehicle> {

  constructor(private vehicleService: VehicleService, private tableConfigService: TableConfigService) {
    super();
  }

  ngOnInit(): void {

    this.tableHeader = ['License plate', 'Model', 'Typology', 'Manufacturer', 'Registration year', 'Vehicle Id'];

    this.vehicleService.getVehicles()
      .subscribe({
        next: vehicles => {
          this.list = vehicles;
          super.currentPage = vehicles.length > 0 ? 1 : 0;
          super.currentPages = this.tableConfigService.getCurrentPages(vehicles.length);
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

}
