import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})

export class ProfilComponent implements OnInit {
  users: any;
  userEditForm: FormGroup;
  showForm = false;
  p: number = 1;
  itemsperpage: number = 5;
  totalUser: any;
  searchText: any;
  user: any; userActif: any;
  verifPass: any = false;
  registerForm!: FormGroup;
  submitted = false;
  emailUser = localStorage.getItem('email')?.replace(/['"]+/g, '');
  img: any; image: any;

  constructor(private userService: UsersService, private formBuilder: FormBuilder, private sanitizer: DomSanitizer, private router: Router) {
    this.userEditForm = this.formBuilder.group({
      id: [''],
      photo: ['', [Validators.required]],
      password: ['', [Validators.required]],
      password2: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {

    this.userService.getUsers().subscribe(
      data => {

        this.users = data;

        this.userActif = this.users.filter((e: any) => e.etat == true && e.email == this.emailUser)
        console.log(this.userActif)
      }
    );

  }


  getUserData() {
    this.showForm = true;
    let id;
    for (const iterator of this.userActif) {
      id = iterator._id
    }
    console.log(id)
    this.userEditForm = this.formBuilder.group({
      id: [id],
      password: ["", [Validators.required]],
      password2: ["", [Validators.required]],
    });
    console.log(id)

    this.image = localStorage.getItem('img')
    const imgRead = this.convertFile(<any>this.image?.replace(/['"]+/g, ''))
    this.img = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(imgRead))
    console.log(this.image)
 
}


modifUsers(){

  const id = this.userEditForm.value.id;
  const user = {
    // photo: this.userEditForm.value.photo,
    password: this.userEditForm.value.password,
    // password2: this.userEditForm.value.password2
  }
  console.log(user)

  this.userService.modifUsers(id,user).subscribe(

    data => {
      console.log(data)
      this.userService.getLogOut();
      this.router.navigateByUrl('login')
    }
  );
}

checkPassword = () => {

  let pass1 = this.userEditForm.value.password//(<HTMLInputElement>document.getElementById("pass1")).value;
  let pass2 = this.userEditForm.value.password2//(<HTMLInputElement>document.getElementById("pass2")).value;

  console.log(pass1 != pass2)

  if (pass1 != pass2) {
    this.verifPass = true;
    this.registerForm = this.formBuilder.group(
      {

        password: [''],
        password2: [''],

      })

    setTimeout(() => { this.verifPass = false }, 3001);
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






