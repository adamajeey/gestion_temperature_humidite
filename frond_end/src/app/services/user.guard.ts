import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot,
UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from './users.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    public authService: UsersService,
    public router: Router
  ) { }

  // Méthode de limitation d'accès à l'application aux connéctés
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLoggedIn !== true) {
      window.alert("Accès non autorisé!");
      this.authService.getLogOut();
      this.router.navigate(['login'])
    }
    else if(this.authService.isLoggedIn === true && localStorage.getItem("role") === "Utilisateur"){
      window.alert("Accès non autorisé!");
      this.router.navigate(['login'])
    }
    return true;
  }
}