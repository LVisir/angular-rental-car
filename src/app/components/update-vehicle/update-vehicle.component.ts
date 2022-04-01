import {Component, OnInit} from '@angular/core';
import {VehicleService} from "../../services/vehicle.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Vehicle} from "../../../interfaces/Vehicle";
import {Error} from "../../../classes/Error";

@Component({
  selector: 'app-update-vehicle',
  templateUrl: './update-vehicle.component.html',
  styleUrls: ['./update-vehicle.component.css']
})
export class UpdateVehicleComponent extends Error implements OnInit {

  vehicle!: Vehicle;
  licensePlate: string = '';
  manufacturer: string = '';
  model: string = '';
  registrYear: string = '';
  typology: string = '';
  idVehicle: string = '';

  constructor(private vehicleService: VehicleService, private _Activatedroute: ActivatedRoute, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe(x => {
      if (x.get('id') !== null) {
        this.idVehicle = <string>x.get('id')
        this.vehicleService.getVehicle(parseInt(<string>x.get('id'))).subscribe({
          next: value => {
            this.vehicle = value
            this.licensePlate = value.licensePlate
            this.manufacturer = value.manufacturer
            this.model = value.model
            this.registrYear = value.registrYear
            this.typology = value.typology
          },
          error: () => {
            this.router.navigate(['/', 'vehicles'])
          }
        })
      }
    })
  }

  onSubmit() {

    this.error = []
    this.validationError = []

    if(!this.licensePlate || !this.manufacturer || !this.model ||
    !this.registrYear || !this.registrYear) {
      this.error.push('Fill all the forms')
    }

    else if (this.idVehicle) {

      this.vehicle.licensePlate = this.licensePlate
      this.vehicle.manufacturer = this.manufacturer
      this.vehicle.model = this.model
      this.vehicle.registrYear = this.registrYear
      this.vehicle.typology = this.typology

      this.vehicleService.updateVehicle(this.vehicle, <number>this.vehicle.idVehicle).subscribe({
        next: () => {
          this.router.navigate(['/', 'vehicles'])
        },
        error: err => {
          this.manageError(err)
        }
      })
    } else {
      this.vehicleService.insertVehicle({
        typology: this.typology,
        model: this.model,
        registrYear: this.registrYear,
        manufacturer: this.manufacturer,
        licensePlate: this.licensePlate,
        actions: []
      }).subscribe({
        next: () => {
          this.router.navigate(['/', 'vehicles'])
        },
        error: err => {
          console.log(err)
          this.manageError(err)
        }
      })
    }

  }

}
