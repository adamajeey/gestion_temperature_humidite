import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/acceuil', title: 'Dashboard',  icon: 'bi bi-speedometer2', class: '' },
    { path: '/profil', title: 'Profil',  icon:'bi bi-person-circle', class: '' },
    { path: '/admin', title: 'Liste Active',  icon:'bi bi-table', class: '' },
    { path: '/pageArchive', title: 'Liste Archive',  icon:'bi bi-table', class: '' },
    { path: '/table', title: 'Historique',  icon:'bi bi-collection', class: '' },
    { path: '/inscription', title: 'Inscription',  icon:'bi bi-people', class: '' }
];

export const USERS: RouteInfo[] = [
  { path: '/acceuil', title: 'Dashboard',  icon: 'bi bi-speedometer2', class: '' },
  { path: '/profil', title: 'Profil',  icon:'bi bi-person-circle', class: '' },
  { path: '/user', title: 'Liste Active',  icon:'bi bi-table', class: '' },
  //{ path: '/pageArchive', title: 'Liste Archive',  icon:'bi bi-table', class: '' },
  { path: '/table', title: 'Historique',  icon:'bi bi-collection', class: '' },
  //{ path: '/inscription', title: 'Inscription',  icon:'bi bi-people', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menuItems!: any[];
  menuItemsUser!:any[];

image:any; roles:any; img:any; userActif:any; users:any;
emailUser = localStorage.getItem('email')?.replace(/['"]+/g, '');

constructor(private userService : UsersService, private sanitizer: DomSanitizer, private router: Router){
  this.menuItems = ROUTES.filter(menuItem => menuItem);
  this.menuItemsUser = USERS.filter(menuItem => menuItem);
}
ngOnInit(): void {
  this.roles = localStorage.getItem('role') == "Admin"
 if (this.userService.getLoggedIn() !== "Admin") {
    this.roles = true
    // console.log('ok')
 } else {
  this.roles = false
  // console.log('no')
 }
 this.image=localStorage.getItem('img')
  const imgRead = this.convertFile(<any>this.image?.replace(/['"]+/g, '')) 
  this.img  = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(imgRead))
  /* console.log(this.img) */

  

  this.userService.getUsers().subscribe(
    data => {

      this.users = data;
      this.userActif = this.users.filter((e: any) => e.etat == true && e.email == this.emailUser)
     
    }
  );

}
logOut(){
this.userService.getLogOut();
// this.ngOnInit()
this.router.navigateByUrl('login')

}

convertFile(str:any) {
var pos = str.indexOf(';base64,');
var type = str.substring(5, pos);
var b64 = str.substr(pos + 8);

// decode base64
var imageContent = atob(b64);

// create an ArrayBuffer and a view (as unsigned 8-bit)
var buffer = new ArrayBuffer(imageContent.length);
var view = new Uint8Array(buffer);

// fill the view, using the decoded base64
for(var n = 0; n < imageContent.length; n++) {
  view[n] = imageContent.charCodeAt(n);
}

// convert ArrayBuffer to Blob
return new Blob([buffer], { type: type });

}
}