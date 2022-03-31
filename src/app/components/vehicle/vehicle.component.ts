import {Component, OnInit} from '@angular/core';
import {Vehicle} from "../../../interfaces/Vehicle";
import {VehicleService} from "../../services/vehicle.service";
import {TableTools} from "../../../classes/TableTools";
import {TableUtility} from "../../../interfaces/TableUtility";
import {HeaderTableDatabase} from "../../../interfaces/HeaderTableDatabase";
import {Actions} from "../../../interfaces/Actions";
import {Router} from "@angular/router";
import {BookingService} from "../../services/booking.service";

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent extends TableTools<Vehicle> implements OnInit, TableUtility<Vehicle> {

  constructor(private vehicleService: VehicleService, private router: Router, private bookingService: BookingService) {
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
          if(err.status && err.status === 403){
            this.router.navigate(['/wrong-page'], {replaceUrl: true})
          }
          else if(err.error !== null && err.error.error) {
            this.errorMessage = err.error.error;
          }
          else{
            this.errorMessage = 'Internal Server Error'
          }
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

    let action1 = this.action = {
      name: 'Rent',
      execute: (obj: Vehicle) => {
        this.router.navigate(['bookings/add-booking', <number>obj.idVehicle])
      },
      type: 'Move',
      color: 'MediumSlateBlue',
      disable: false
    }

    let action2 = this.action = {
      name: 'Delete',
      execute: (obj: Vehicle) => {
        this.delete(<number>obj.idVehicle)
        this.updateList(<number>obj.idVehicle)
      },
      type: 'OnPlace',
      color: 'MediumSlateBlue',
      disable: false
    }

    let action3 = this.action = {
      name: 'Edit',
      execute: (obj: Vehicle) => {
        this.move(<number>obj.idVehicle)
      },
      type: 'Move',
      color: 'MediumSlateBlue'
    }

    let actions: Actions[] = []

    if (sessionStorage.getItem('superuser') !== null) {
      actions.push({...action2})
      actions.push({...action3})
    }
    else if(sessionStorage.getItem('customer') !== null) {
      actions.push({...action1})
    }

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
    this.router.navigate(['/vehicles/update-vehicle', id])
  }

  search(field: string, value: string): void {
    this.vehicleService.searchVehiclesBy(field, value).subscribe({
      next: vehicles => {
        this.list = []
        this.attachActions(vehicles)
        this.errorMessage = this.list.length >0 ? '' : this.errorMessage
      },
      error: err => {
        this.errorMessage = 'No result/s from the search'
        console.log(err)
      }
    })
  }

  reset(): void {
    this.vehicleService.getVehicles()
      .subscribe({
        next: vehicles => {
          this.list = []
          this.attachActions(vehicles);
          super.currentPage = vehicles.length > 0 ? 1 : 0;
          super.currentPages = this.getCurrentPages(vehicles.length);
          this.dataSize = Math.floor(vehicles.length / 10);
          this.errorMessage = ''
        },
        error: () => {
          this.errorMessage = 'No result/s found'
        }
      })
  }

}
