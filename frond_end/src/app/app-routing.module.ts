import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscrptionComponent } from './inscrption/inscrption.component';
import { ModificationComponent } from './modification/modification.component';
import { PageArchiveComponent } from './page-archive/page-archive.component';
import { ProfilComponent } from './profil/profil.component';
import { UtilisateurComponent } from './users/utilisateur/utilisateur.component';
import { LoginComponent } from './login/login.component';
import { SimpleusersComponent } from './users/simpleusers/simpleusers.component';
import { AccueilDashboardComponent } from './accueil-dashboard/accueil-dashboard.component';
import { SidebarComponent } from './users/sidebar/sidebar.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
{path: "pageArchive" , component: PageArchiveComponent},
{path: "admin", component: UtilisateurComponent},
{path: "profil", component: ProfilComponent},
{path: "user", component: SimpleusersComponent},
{path:"acceuil", component: AccueilDashboardComponent},
{path:"inscription", component: InscrptionComponent},
{path:"login", component: LoginComponent},
{path:"sides", component: SidebarComponent},
{path:"menu", component: MenuComponent},
{path:"", component: LoginComponent},
{path:"modification", component: ModificationComponent},




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }
