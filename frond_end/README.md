# SimplonApi2

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.




<div class="container">
    <nav class="navbar navbar-expand-lg bg-primary  fixed-top" style="max-height: 5rem;">
        <div class="container-fluid shadow">
    
            <img src="https://simplon.sn/wp-content/uploads/2022/03/logo-simplonSenegal-1-e1647016201426.png" class="navbar-brand placeholder-glow p-2 img-thumbnail" height="50" height="50">
    
            <button class="navbar-toggler fs-1" onclick="hideShow()" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon bi bi-menu-button"></span>
            </button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
    
                <ul class="navbar-nav me-auto mb-2 rounded  bg-light shadow  mb-lg-0" style="max-height: 5rem; min-width:70%;">
                    <span class="d-flex justify-content-between shadow w-100 ml-2">
    
                       
                                            <span class="d-flex">
                                                <li class="nav-item nav-link" *ngIf="roles == 'admin'">
                                                    <a class="nav-link  btn-light border shadow  rounded-circle" title="Users" aria-current="page" routerLink="user">
                                                        <i class=" bi-people fs-4  p-2 fw-bolder " ></i>
                                                    </a>
                                                </li>
                                                <li class="nav-item nav-link " *ngIf="roles !='admin'">
                                                    <a class="nav-link  btn-light border shadow  rounded-circle" title="Users" aria-current="page" routerLink="admin">
                                                        <i class=" bi-people fs-4  p-2 fw-bolder " ></i>
                                                    </a>
                                                </li>
                                                <li class="nav-item nav-link" *ngIf="roles">
                                                    <a class="nav-link btn-light border shadow rounded-circle" title="Archives" routerLink="pageArchive" data-toggle="tooltip" data-placement="bottom" title="archives">
                                                        <i class=" bi-archive p-2 fs-4 fw-bolder" ></i>
                                                    </a>
                                                </li>    
                                                <li class="nav-item nav-link" *ngIf="roles">
                                                    <a class="nav-link btn-light border shadow rounded-circle" title="Archives" routerLink="inscription" data-toggle="tooltip" data-placement="bottom" title="inscription">
                                                        <i class=" bi-person-plus p-2 fs-4 fw-bolder" ></i>
                                                    </a>
                                                </li>   

                                            </span>
                                        
                                       
                       
    
    
                        <hr class="divider">
                        <h5 class="text-muted mt-2">ÉCOLE DE LA RÉUSSITE </h5>
    
    
                        <li class=" nav-item  dropdown ">
    
                            <a class="nav-link  d-sm-flex justify-content-center shadow bg-body text-dark text-decoration-none" title="Avatar" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style="max-height: 4.5rem;">
    
                               
                                        <img [attr.src]="img" *ngIf="img" class="rounded-circle border" width="60" height="60" />
                                        <!-- <img *ngIf="!image"  src="../../../assets/img.jpg"  class="rounded-circle border m-1   " height="50" /> -->
                                        
                                <p class="d-block" *ngFor="let user of userActif">
                                   <span class="d-none d-sm-inline ">{{user.prenom | titlecase}} {{user.nom}}</span> <br>
                                    <span class="d-none d-sm-inline ">{{user.matricule | uppercase}}</span>
    
                                </p>
    
                            </a>
                            <ul class="dropdown-menu w-25" aria-labelledby="navbarDropdown">
                                <li><a class="dropdown-item" routerLink="profil"><i class=" bi-gear p-2 fs-5 fw-bolder"></i>profile</a></li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                <li><a class="dropdown-item" (click)="logOut()"><i class="bi bi-box-arrow-left p-2 fs-5"></i>Déconnecter</a></li>
    
    
    
                            </ul>
                        </li>
                    </span>
    
                </ul>
    
            </div>
        </div>
        <!-- </div> -->
    </nav>
</div>