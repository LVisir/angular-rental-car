import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from "./services/user.service";

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(sessionStorage.getItem('tokenJWT') !== null){
      if(this.userService.getUserModel(sessionStorage.getItem('tokenJWT')).roles.some(role => route.data['role'].includes(role))){
        return true
      }
      else{
        this.router.navigateByUrl('/wrong-page')
        return false
      }
    }
    else{
      this.router.navigateByUrl('/wrong-page')
      return false
    }
  }

}
