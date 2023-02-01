

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2'; 
import { UsernameValidator } from '../username.validator';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})

export class ProfilComponent implements OnInit {
 
  users: any;
  userEditForm: FormGroup;
  showForm = false;
  showFormPass= false;
  p: number = 1;
  itemsperpage: number = 5;
  totalUser: any;
  searchText: any;
  user: any; userActif: any;
  verifPass: any = true;
  registerForm!: FormGroup;
  submitted = false;
  emailUser = localStorage.getItem('email')?.replace(/['"]+/g, '');
  img: any; image: any;
  emailExiste:any;
spin= false;
invalid= false;
errorMsg:any;

  constructor(private userService: UsersService, private formBuilder: FormBuilder, private sanitizer: DomSanitizer, private router: Router) {
    this.userEditForm = this.formBuilder.group({
      id: [''],
      photo: ['', [Validators.required]],
      prenom: ['', [Validators.required,UsernameValidator.cannotContainSpace]],
      nom: ['', [Validators.required,UsernameValidator.cannotContainSpace]],
      email: ['', [Validators.required,Validators.email]],
      password3: ['', [Validators.required,Validators.minLength(8)]],
      password: ['', [Validators.required,Validators.minLength(8)]],
      password2: ['', [Validators.required,Validators.minLength(8)]],
    
    });
  }
  

  simpleAlert(){  
    Swal.fire('MODIFICATION RÉUSSIE AVEC SUCCÉE'); 
    Swal.update({
    icon: 'success' 
    }) 
  } 

  ngOnInit(): void {

    this.userService.getUsers().subscribe(
      data => {

        this.users = data;

        this.userActif = this.users.filter((e: any) => e.etat == true && e.email == this.emailUser)
        /* console.log(this.userActif) */
      }
    );

  }
  

/* recuperer les email,nom et prenom qu'on va modifier */
getUserData(id:any,email:any,prenom:any,nom:any){

  
  Swal.fire({  
    title: 'Voulez-vous vraiment modifier votre profil?',  
    text: 'Si oui met ok',  
    icon: 'warning', 
    confirmButtonColor: "#B82010", 
    cancelButtonColor: "green" ,  
    showCancelButton: true,  
    confirmButtonText: 'ok!',  
    cancelButtonText: 'Annuler'  
  }).then((result) => {  
    if (result.value) {  
      this.showForm = true;
      this.userEditForm = this.formBuilder.group({
          id:[id],
          prenom: [prenom, [Validators.required,UsernameValidator.cannotContainSpace,]],
          nom: [nom, [Validators.required,UsernameValidator.cannotContainSpace]],
          email: [email, [Validators.required,Validators.email]],
        });  
    }  
  })
    
  for (const iterator of this.userActif) {
    id = iterator._id
  }
 /*  console.log(id) */
 
  this.image = localStorage.getItem('img')
  const imgRead = this.convertFile(<any>this.image?.replace(/['"]+/g, ''))
  this.img = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(imgRead))
  /* console.log(this.image) */
}

/* fonction pour modifier le profil d'un utilisateur */
modifUsers (){
  const id =  this.userEditForm.value.id;
  for (const iterator of this.users) {
    this.submitted = true
    this.spin = true
if(this.userEditForm.invalid){
    this.spin = false
    return ;
  }
  
  /* console.log(iterator.email  ) */
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
  /*   console.log(error ) */
  }
 );
}


/* recuperer les mots de passe qu'on doit modifier */
  getUserPassword(id:any) {
    
    Swal.fire({  
      title: 'Voulez-vous vraiment modifier votre mot de passe',  
      text: 'Si oui met ok',  
      icon: 'warning',  
      confirmButtonColor: "#B82010", 
      cancelButtonColor: "green" , 
      showCancelButton: true,  
      confirmButtonText: 'ok!',  
      cancelButtonText: 'Annuler'  
    }).then((result) => {  
      if (result.value) {
    this.showFormPass = true;
    this.userEditForm = this.formBuilder.group({
      id: [id],
      password: ["", [Validators.required,Validators.minLength(8)]],
      password2: ['', [Validators.required,Validators.minLength(8)]],
      password3: ['', [Validators.required,Validators.minLength(8)]],
    });
   
   
    for (const iterator of this.userActif) {
      id = iterator._id
    }
 
      }
    });
  
    this.image = localStorage.getItem('img')
    const imgRead = this.convertFile(<any>this.image?.replace(/['"]+/g, ''))
    this.img = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(imgRead))
    /* console.log(this.image) */
  }
 

    

/* modifier le mot de passe */
modifUsersPassword(){

  const id = this.userEditForm.value.id;
    this.submitted = true
    this.spin = true
    
   if(this.userEditForm.invalid){
    this.spin = false
    return ;
  }
const user = {
    password: this.userEditForm.value.password,
  }
  this.userService.changeRole(id,user).subscribe(
data => {
      this.ngOnInit();
      this.showFormPass = false
    },
    error =>{
      /* console.log(error ) */
    }
   );
  
}


  
/* controler les deux mots de passe */
 checkPassword = () => {

  let pass1 = this.userEditForm.value.password//(<HTMLInputElement>document.getElementById("pass1")).value;
  let pass2 = this.userEditForm.value.password2//(<HTMLInputElement>document.getElementById("pass2")).value;
/* 
  console.log(pass1 != pass2) */

  if (pass1 != pass2) {
    this.verifPass = false;
    this.registerForm = this.formBuilder.group(
      {

        password: [''],
        password2: [''],

      })

    setTimeout(() => { this.verifPass = true }, 3001);
  }
  
}

logOut(){
  // this.userService.getLogOut();
  this.router.navigateByUrl('login')
}

convertFile(str: any) {
  var pos = str.indexOf(';base64,');
  var type = str.substring(5, pos);
  var b64 = str.substr(pos + 8);

  // decode base64
  var imageContent = atob(b64);

  // create an ArrayBuffer and a view (as unsigned 8-bit)
  var buffer = new ArrayBuffer(imageContent.length);
  var view = new Uint8Array(buffer);

  // fill the view, using the decoded base64
  for (var n = 0; n < imageContent.length; n++) {
    view[n] = imageContent.charCodeAt(n);
  }

  // convert ArrayBuffer to Blob
  return new Blob([buffer], { type: type });

}

}
