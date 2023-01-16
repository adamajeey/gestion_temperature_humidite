import { Component } from '@angular/core';

@Component({
  selector: 'app-matieres',
  templateUrl: './matieres.component.html',
  styleUrls: ['./matieres.component.css']
})
export class MatieresComponent {

}
export interface Matiere {
matricule: string;
nom: String;
prenom: string;
email: string;
roles: string;
action: string;
}