import {Component, OnInit} from '@angular/core';
import {Vehicle} from "../../../interfaces/Vehicle";
import {VehicleService} from "../../services/vehicle.service";
import {TableTools} from "../../../classes/TableTools";
import {TableUtility} from "../../../interfaces/TableUtility";
import {HeaderTableDatabase} from "../../../interfaces/HeaderTableDatabase";
import {Actions} from "../../../interfaces/Actions";

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent extends TableTools<Vehicle> implements OnInit, TableUtility<Vehicle> {

  constructor(private vehicleService: VehicleService) {
    super();
  }

  console = console;

  ngOnInit(): void {
    this.dbHeader = ['licensePlate', 'model', 'typology', 'manufacturer', 'registrYear', 'idVehicle'];

    this.vehicleService.getVehicles()
      .subscribe({
        next: vehicles => {
          this.attachActions(vehicles);
          super.currentPage = vehicles.length > 0 ? 1 : 0;
          super.currentPages = this.getCurrentPages(vehicles.length);
          this.dataSize = Math.floor(vehicles.length / 10);
        },
        error: err => {
          this.errorMessage = err.error.error;
        }
      })

  }

  mapping(vehicle: Vehicle): Map<any, any> {
    const mapObj = new Map();
    mapObj.set('licensePlate', vehicle.licensePlate);
    mapObj.set('model', vehicle.model);
    mapObj.set('typology', vehicle.typology);
    mapObj.set('manufacturer', vehicle.manufacturer);
    mapObj.set('registrYear', vehicle.registrYear);
    mapObj.set('idVehicle', vehicle.idVehicle);

    return mapObj;

  }

  tableDbHeader: HeaderTableDatabase[] = [
    {
      headerTable: 'License plate',
      headerDb: ['licensePlate'],
      state: 0,
      sortable: true
    },
    {
      headerTable: 'Model',
      headerDb: ['model'],
      state: 0,
      sortable: true
    },
    {
      headerTable: 'Typology',
      headerDb: ['typology'],
      state: 0,
      sortable: true
    },
    {
      headerTable: 'Manufacturer',
      headerDb: ['manufacturer'],
      state: 0,
      sortable: true
    },
    {
      headerTable: 'Registration year',
      headerDb: ['registrYear'],
      state: 0,
      sortable: true
    },
    {
      headerTable: 'Vehicle Id',
      headerDb: ['idVehicle'],
      state: 0,
      sortable: true
    },
  ]

  attachActions(object: Vehicle[]): void {

    const deleteVehicle = (id: number) => {
      this.delete(id)
    }

    const updateVehiclesList = (id: number) => {
      this.updateList(id)
    }

    let action2 = this.action = {
      name: 'Delete',
      execute(obj: Vehicle) {
        if (obj.idVehicle !== undefined) {
          deleteVehicle(obj.idVehicle)
          updateVehiclesList(obj.idVehicle)
        }
      },
      type: 'OnPlace'
    }

    let action3 = this.action = {
      name: 'Edit',
      execute(obj: Vehicle) {
        console.log(obj.idVehicle);
      },
      type: 'Move'
    }

    let actions: Actions[] = [
      {...action2}, {...action3}
    ]

    object.map(x => {
      this.list.push({...x, actions: actions})
    })

    this.totalActions = actions.length;

  }

  delete(id: number): void {
    this.vehicleService.deleteVehicle(id).subscribe({
      error: err => console.log(err)
    })
  }

  updateList(id: number): void {
    this.list = this.list.filter(x => {
      return x.idVehicle !== id && x
    })
  }

  move(id: number): void {
  }

}
