import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
image:any; roles:any; img:any; userActif:any; users:any;
emailUser = localStorage.getItem('email')?.replace(/['"]+/g, '');


constructor(private userService : UsersService, private sanitizer: DomSanitizer, private router: Router){
  
}
ngOnInit(): void {
  this.roles = localStorage.getItem('role') == "admin"
 if (this.userService.getLoggedIn() !== "admin") {
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


