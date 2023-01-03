import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})

export class UtilisateurComponent implements OnInit { 
users: any;
userEditForm : FormGroup;
showForm = false; 
p: number= 1;
itemsperpage: number= 5;
totalUser:any; 
searchText:any;
user = []; userActif:any = [];
emailExiste:any;

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

        this.userActif = this.users.filter((e:any)=> e.etat == true && e.email != localStorage.getItem('email')?.replace(/['"]+/g, ''))
        
      }
); 

}

retrieveData(){
  this.userService.getUsers().subscribe((data:any)=>{
    this.users = data;
     this.totalUser = data.length; 
  })
}


changeRole=(id:any,roles:any)=> {
 roles == "admin" ? roles ="utilisateur": roles = "admin"

 const user ={
  roles : roles

 }

 Swal.fire({  
  title: 'Voulez-vous vraiment effectuer cette action?',  
  text: 'Si oui met ok',  
  icon: 'warning',  
  showCancelButton: true,  
  confirmButtonText: 'ok!',  
  cancelButtonText: 'Annuler'  
}).then((result) => {  
  if (result.value) {  

    this.userService.changeRole(id,user).subscribe(

      data=>{
        // this.simpleAlert()
        Swal.fire({
         icon:'success' 
        })  
        this.ngOnInit();
      }
      );
  }
  
})
 
}


deleteId=(id:any,etat:any)=> {
  
etat == "false" ? etat = true : etat = false

 const user ={
 etat : etat

 }

 Swal.fire({  
  title: 'Voulez-vous vraiment effectuer cette action?',  
  text: 'Si oui met ok',  
  icon: 'warning',  
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

getUserData(id:any,email:any,prenom:any,nom:any){

  
  Swal.fire({  
    title: 'Voulez-vous vraiment effectuer cette action?',  
    text: 'Si oui met ok',  
    icon: 'warning',  
    showCancelButton: true,  
    confirmButtonText: 'ok!',  
    cancelButtonText: 'Annuler'  
  }).then((result) => {  
    if (result.value) {  
      this.showForm = true;
      this.userEditForm = this.formBuilder.group({
          id:[id],
          prenom: [prenom, [Validators.required]],
          nom: [nom, [Validators.required]],
          email: [email, [Validators.required]],
        });  
    }  
  })
}


modifUsers (){
  const id =  this.userEditForm.value.id;
  for (const iterator of this.users) {
  console.log(iterator.email  )
  if(iterator.email == this.userEditForm.value.email && iterator._id != id){
    this.emailExiste = "Email existe déjà";
    setTimeout(() => {
      this.emailExiste=""
    }, 2000);
    return;
  }
}

 const user ={
  nom : this.userEditForm.value.nom,
  prenom: this.userEditForm.value.prenom,
  email: this.userEditForm.value.email
 }
 
 this.userService.changeRole(id,user).subscribe(
   
   data=>{
   
    this.ngOnInit();
    this.showForm = false
  },
  error =>{
    console.log(error )
  }
 );
}

}



