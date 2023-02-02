import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { SocketService } from '../meteo.service';
import { io } from 'socket.io-client';

import { Temp_Humid } from '../services/interfaces/movie';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  registerForm!:FormGroup;
  title = 'angularvalidate';
  submitted = false;
  errorSms:any;
  spin= false;
  


  constructor(private userService : UsersService, private formBuilder: FormBuilder ,private route: Router,private meteoservice:SocketService) {
    
  }
  
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
    
      email:['',[Validators.required,Validators.email]],
      
      password:['',[Validators.required,Validators.minLength(8)]],
      
      })
      this.meteoservice.onFetch().subscribe((data)=>{
        /* console.log(data); */
        
      })
     

      
      
      this.meteoservice.onFetchitem().subscribe((mute)=>{
      /*   console.log(mute); */
        
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
 
   email : this.registerForm.value. email,
   password: this.registerForm.value. password,
  
  }
  
  //Redirection apres la connexion
  this.userService.getConnexion(user).subscribe(
    data=>{
     /*  console.log(data) */
      if (data.data?.roles.replace(/['"]+/g, '') == "Admin" || data.data?.roles.replace(/['"]+/g, '') == "Utilisateur") {
          this.route.navigateByUrl('acceuil')
          this.spin = true
      } 
    }, 
    /* verifie si l'utilisateur n'est pas dans la base de donnée ou l'utilisateur est archiver */
    error=>{
     /*  console.log(error) */
    /*  console.log(error) */
      if(error == 'Unauthorized'){
        this.errorSms ='Cette utilisateur est archivé'
        this.spin = false
        setTimeout(()=>{ this.errorSms = false}, 3001); 
      }else {
      this.errorSms ='Vous  etes pas dans la base de données'
      this.spin = false
      setTimeout(()=>{ this.errorSms = false}, 3001); 
    }
    }
   );
}
}
