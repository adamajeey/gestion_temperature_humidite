import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './users/header/header.component';
import { UtilisateurComponent } from './users/utilisateur/utilisateur.component';
import { ModificationComponent } from './modification/modification.component';
import { SimpleusersComponent } from "./users/simpleusers/simpleusers.component";
import { CommonModule, NgClass, NgStyle } from '@angular/common';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { LoginComponent } from './login/login.component';
import { InscrptionComponent } from './inscrption/inscrption.component';
import { PageArchiveComponent } from './page-archive/page-archive.component';
import { HelperService } from './helper/helper.service';
import { ProfilComponent } from './profil/profil.component';
import { AccueilDashboardComponent } from './accueil-dashboard/accueil-dashboard.component';
import { SidebarComponent } from './users/sidebar/sidebar.component';


 

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        UtilisateurComponent,
        ModificationComponent,
        SimpleusersComponent,
        LoginComponent,
        InscrptionComponent,
        PageArchiveComponent,
        ProfilComponent,
        AccueilDashboardComponent,
        SidebarComponent,
       
        
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        FormsModule,
        ReactiveFormsModule,  
        NgxPaginationModule,
        CommonModule,
        Ng2SearchPipeModule,
        NgStyle,
        NgClass

    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HelperService, multi: true }
      ],
})
export class AppModule {}
