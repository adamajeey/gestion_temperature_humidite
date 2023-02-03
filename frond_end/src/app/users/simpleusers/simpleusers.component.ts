import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-simpleusers',
  templateUrl: './simpleusers.component.html',
  styleUrls: ['./simpleusers.component.css']
})
export class SimpleusersComponent implements OnInit {

users:any;
/* showForm: any; */
  /* userEditForm: FormGroup; */
showForm = false; 
p: number= 1;
itemsperpage: number= 8;
totalUser:any; 
searchText:any;
user:any;userActif:any;
show:boolean = false;
  roles: any;
 
  constructor(private userService : UsersService, private router: Router){
    
  }

  ngOnInit(): void {
  this.userService.getUsers().subscribe( /* déclarer le service getusers */
    data =>{
      this.users = data;

      this.userActif = this.users.filter((e:any)=> e.etat == true)
     
    }
  );
  this.roles = localStorage.getItem('role');
  console.log(this.roles.includes('Utilisateur'));

if (!this.roles.includes('Utilisateur')) {
  this.router.navigateByUrl('acceuil')
  
}

}
public afficher():void{
  this.show = !this.show;
}
}
