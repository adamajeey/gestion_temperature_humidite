import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-page-archive',
  templateUrl: './page-archive.component.html',
  styleUrls: ['./page-archive.component.css']
})

export class PageArchiveComponent implements OnInit {

users: any;
userEditForm : FormGroup;
showForm = false; 
p: number= 1;
itemsperpage: number= 8;
totalUser:any; 
searchText:any;
user = []; userArchive = [];
show:boolean = false;

  constructor(private userService : UsersService, private formBuilder : FormBuilder){
    this.userEditForm = this.formBuilder.group({
      id:[''],
      prenom: ['', [Validators.required]],
      nom: ['', [Validators.required]],
      email: ['', [Validators.required]],
    });
  }

ngOnInit(): void {

  this.userService.getUsers().subscribe( 
      data =>{

        this.users = data;
        this.userArchive = this.users.filter((e:any)=> e.etat == false)
               /* console.log(this.userArchive) */
              }
);

}

retrieveData(){
  this.userService.getUsers().subscribe((data:any)=>{
    this.users = data;
     this.totalUser = data.length; 
  })
}



ddeleteId=(id:any,etat:any)=> {


    etat == true ? etat = false : etat = true
  
   const user ={
   etat : etat
  
   }
  
   Swal.fire({  
    title: 'Voulez-vous vraiment desarchiver cette utilisateur?',  
    text: 'Si oui met ok',  
    icon: 'warning',  
    confirmButtonColor: '#B82010',  
    cancelButtonColor: 'green' ,
    showCancelButton: true,  
    confirmButtonText: 'ok!',  
    cancelButtonText: 'Annuler'  
  }).then((result) => {  
    if (result.value) {  
  
      this.userService.modifUsers(id,user).subscribe(
  
        data=>{
    
          Swal.fire({
            icon:'success' 
          })
          this.ngOnInit();
        }
     );  
    }
  }) 
  
}

public afficher():void{
  this.show = !this.show;
}



}



