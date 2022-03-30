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

    const deleteVehicle = (id: number) => {
      this.delete(id)
    }

    const updateVehiclesList = (id: number) => {
      this.updateList(id)
    }

    const moveToUpdatePage = (id: number) => {
      this.move(id)
    }

    const moveToAddBookingPage = (vehicleId: number) => {
      this.router.navigate(['bookings/add-booking', vehicleId])
    }

    let action1 = this.action = {
      name: 'Rent',
      execute(obj: Vehicle) {
        if (obj.idVehicle !== undefined) {
          moveToAddBookingPage(obj.idVehicle)
        }
      },
      type: 'Move',
      color: 'MediumSlateBlue'
    }

    let action2 = this.action = {
      name: 'Delete',
      execute(obj: Vehicle) {
        if (obj.idVehicle !== undefined) {
          deleteVehicle(obj.idVehicle)
          updateVehiclesList(obj.idVehicle)
        }
      },
      type: 'OnPlace',
      color: 'MediumSlateBlue'
    }

    let action3 = this.action = {
      name: 'Edit',
      execute(obj: Vehicle) {
        if (obj.idVehicle !== undefined) {
          moveToUpdatePage(obj.idVehicle)
        }
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

}
