import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { UsernameValidator } from './username.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})

export class UtilisateurComponent implements OnInit {
  route!: string
  isActif: boolean = false
  registerForm!: FormGroup;
  title = 'angularvalidate';
  submitted = false;
  invalid = false;
  verifPass: any = true;
  users: any;
  userEditForm!: FormGroup;
  showForm = false;
  p: number = 1;
  itemsperpage: number = 8;
  totalUser: any;
  searchText: any;
  user = []; userActif: any = [];
  emailExiste: any;
  spin = false;
  errorMsg: any;
  show: boolean = false;


  constructor(private userService: UsersService, private formBuilder: FormBuilder, private router: Router) {
    this.userEditForm = this.formBuilder.group({
      id: [''],
      prenom: ['', [Validators.required, UsernameValidator.cannotContainSpace]],
      nom: ['', [Validators.required, UsernameValidator.cannotContainSpace]],
      email: ['', [Validators.required, Validators.email]],
    });
    this.route = this.router.routerState.snapshot.url
    this.isActif = this.route == '/admin' ? true : false
  }




  ngOnInit(): void {

    this.userService.getUsers().subscribe(
      data => {

        this.users = data;

        this.userActif = this.users.filter((e: any) => e.etat == this.isActif && e.email != localStorage.getItem('email')?.replace(/['"]+/g, ''))

      }
    );

  }

  retrieveData() {
    this.userService.getUsers().subscribe((data: any) => {
      this.users = data;
      this.totalUser = data.length;
    })
  }


  changeRole = (id: any, roles: any) => {
    roles == "admin" ? roles = "utilisateur" : roles = "admin"

    const user = {
      roles: roles

    }

    Swal.fire({
      title: 'Voulez-vous vraiment changer le role de cet utilisateur?',
      text: 'Si oui met ok',
      icon: 'warning',
      confirmButtonColor: "#B82010",
      cancelButtonColor: "green",
      showCancelButton: true,
      confirmButtonText: 'ok!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.value) {

        this.userService.changeRole(id, user).subscribe(

          data => {
            // this.simpleAlert()
            Swal.fire({
              icon: 'success'
            })
            this.ngOnInit();
          }
        );
      }

    })

  }


  deleteId = (id: any, etat: any) => {

    etat == "false" ? etat = true : etat = false

    const user = {
      etat: etat

    }

    Swal.fire({
      title: 'Voulez-vous vraiment archiver cet utilisateur?',
      text: 'Si oui met ok',
      icon: 'warning',
      confirmButtonColor: "#B82010",
      cancelButtonColor: "green",
      showCancelButton: true,
      confirmButtonText: 'ok!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.value) {

        this.userService.modifUsers(id, user).subscribe(

          data => {

            Swal.fire({
              icon: 'success'
            })
            this.ngOnInit();
          }
        );
      }
    })


  }


  getUserData(id: any, email: any, prenom: any, nom: any) {

        this.showForm = true;
        this.userEditForm = this.formBuilder.group({
          id: [id],
          prenom: [prenom, [Validators.required, UsernameValidator.cannotContainSpace]],
          nom: [nom, [Validators.required, UsernameValidator.cannotContainSpace]],
          email: [email, [Validators.required, Validators.email]],
        });
      }
 

  modifUsers() {
    const id = this.userEditForm.value.id;
    for (const iterator of this.users) {
     
      this.submitted = true
      this.spin = true
      if (this.userEditForm.invalid) {
        this.spin = false
        return;
      }

      console.log(iterator.email)
      if (iterator.email == this.userEditForm.value.email && iterator._id != id) {
        this.emailExiste = "Email existe déjà";
        setTimeout(() => {
          this.emailExiste = ""
        }, 2000);
        return;
      }
    }

    const user = {
      nom: this.userEditForm.value.nom,
      prenom: this.userEditForm.value.prenom,
      email: this.userEditForm.value.email
    }

    this.userService.changeRole(id, user).subscribe(

      data => {

    Swal.fire({
      title: 'Voulez-vous vraiment modifier le profil de utilisateur?',
      text: 'Si oui met ok',
      icon: 'warning',
      confirmButtonColor: "#B82010",
      cancelButtonColor: "green",
      showCancelButton: true,
      confirmButtonText: 'ok!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.value) {
    
        this.ngOnInit();
        this.showForm = false;
      
      }
    }
    )
  },
      
      error => {
        console.log(error)
      }
    );
  }

  public afficher(): void {
    this.show = !this.show;
  }
  ddeleteId = (id: any, etat: any) => {


    etat == true ? etat = false : etat = true

    const user = {
      etat: etat

    }

    Swal.fire({
      title: 'Voulez-vous vraiment desarchiver cette utilisateur?',
      text: 'Si oui met ok',
      icon: 'warning',
      confirmButtonColor: '#B82010',
      cancelButtonColor: 'green',
      showCancelButton: true,
      confirmButtonText: 'ok!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.value) {

        this.userService.modifUsers(id, user).subscribe(

          data => {

            Swal.fire({
              icon: 'success'
            })
            this.ngOnInit();
          }
        );
      }
    })

  }

}


