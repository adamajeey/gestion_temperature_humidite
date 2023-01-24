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
import { DiagrammeComponent } from './diagramme/diagramme.component';
import { TableHistoriqueComponent } from './table-historique/table-historique.component';
import { MenuComponent } from './menu/menu.component';
import { AuthGuard } from "./services/user.guard";

const routes: Routes = [
{path: "pageArchive" , component: UtilisateurComponent, canActivate: [AuthGuard]},
{path: "admin", component: UtilisateurComponent, canActivate: [AuthGuard]},
{path: "profil", component: ProfilComponent, canActivate: [AuthGuard]},
{path: "user", component: SimpleusersComponent, canActivate: [AuthGuard]},
{path:"acceuil", component: AccueilDashboardComponent, canActivate: [AuthGuard]},
{path:"inscription", component: InscrptionComponent, canActivate: [AuthGuard]},
{path:"login", component: LoginComponent},
{path:"sides", component: SidebarComponent},
{path:"", component: LoginComponent},
{path:"diagramme", component: DiagrammeComponent},
{path:"table", component: TableHistoriqueComponent},
{path:"sides", component: SidebarComponent, canActivate: [AuthGuard]},
{path:"menu", component: MenuComponent, canActivate: [AuthGuard]},
{ path: '', redirectTo: '/login', pathMatch: 'full' },
{path:"modification", component: ModificationComponent, canActivate: [AuthGuard]},




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }
