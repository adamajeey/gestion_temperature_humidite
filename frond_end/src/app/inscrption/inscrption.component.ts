import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
/* import { Person } from './Person'; */
import { UsernameValidator } from '../username.validator';
import Swal from 'sweetalert2'; 
import { Router } from '@angular/router';




@Component({
  selector: 'app-inscrption',
  templateUrl: './inscrption.component.html',
  styleUrls: ['./inscrption.component.css']
})
export class InscrptionComponent {
  registerForm!:FormGroup;
  title = 'angularvalidate';
  submitted = false;
  verifPass:any = true;
  imgSelected:any;
  errorMsg:any;
  spin= false;
  imgHeight= false;

  constructor(private userService : UsersService, private formBuilder: FormBuilder, private router: Router) {
    this.registerForm = this.formBuilder.group({
      id:[''],
      prenom: ['', [Validators.required,UsernameValidator.cannotContainSpace]],
      nom: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      roles: ['', [Validators.required]],
      img: [''],
      
    });
  }
  ngOnInit():void {
    this.registerForm = this.formBuilder.group({
     prenom:['',[Validators.required,UsernameValidator.cannotContainSpace]],
      nom:['',Validators.required,UsernameValidator.cannotContainSpace],
      email:['',[Validators.required,Validators.email]],
      roles:['',Validators.required],
      password:['',[Validators.required,Validators.minLength(8)]],
      passwordc:['',Validators.required]
      })
  }

  checkPassword =()=>{

    let pass1 = (<HTMLInputElement>document.getElementById("pass1")).value;
    let pass2 = (<HTMLInputElement>document.getElementById("pass2")).value;

    console.log(pass1 != pass2)

    if( pass1 != pass2)
    {

      this.verifPass = false;
      console.log(this.verifPass)
      this.registerForm = this.formBuilder.group(
        {

        password:[''],
        passwordc:[''],

      })

      setTimeout(()=>{ this.verifPass = true}, 3000);

      
    }
 }

 
   simpleAlert(){  
    Swal.fire('INSCRIPTION RÉUSSIE AVEC SUCCÉE'); 
    Swal.update({
      icon: 'success'
    }) 
  }  
onSubmit(){
this.submitted = true
  this.spin = true
 if(this.registerForm.invalid){
  this.spin = false
  return ;
} 

 /* /insertion sur la base de données/ */
  const user ={
   prenom : this.registerForm.value.prenom,
   nom : this.registerForm.value.nom,
   email : this.registerForm.value.email,
   roles : this.registerForm.value.roles,
   password: this.registerForm.value.password,
   matricule : Math.random().toString(26).slice(2),  
   date_inscri: new Date().toISOString(),
   etat: true,
   img : this.imgSelected //| <any>null
  }

  


  this.userService.addUsers(user).subscribe(
    data=>{
      // console.log(data)
    //  this.popup = false;
    //  this.popup = true;
      this.spin = false;
      this.simpleAlert()
      this.router.navigateByUrl('login'); 
      
  
    }, 
   /*  /controle email/ */
    error=>{
      console.log(error)
      if(error == 'Conflict')
      { 
        this.errorMsg ='error email existant';
          this.spin = false
          setTimeout(()=>{ this.errorMsg = false}, 3001);
      }else if(error == 'Payload too large')
        this.imgHeight= true;  
        setTimeout(()=>{ this.imgHeight = false}, 3001);
    }


   );

}

onFileSelected(event: any) {


  let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imgSelected = reader.result; 
        // console.log(this.imgSelected);
      };
    }

}

selectFile(event: any) { 

}


}

