import { Component, OnInit } from '@angular/core';
import { Groupe } from '../model/groupe.model';
import { EtudiantService } from '../services/etudiant.service';
@Component({
  selector: 'app-liste-groupes',
  templateUrl: './liste-groupes.component.html',
  styles: [
  ]
})
export class ListeGroupesComponent implements OnInit {
  groupes!: Groupe[];
  updatedGroupe: Groupe = { "idGroupe": 0, "nomGroupe": "" };
  ajout:boolean=true;
  constructor(private etuidantService: EtudiantService) { }
  ngOnInit(): void {
    this.etuidantService.listeGroupes().
      subscribe(gp => {
        this.groupes = gp._embedded.groupes;
        console.log(gp);
      });

  }
  groupeUpdated(gp: Groupe) {
    console.log("groupe récu de composant update groupe", gp);
    this.etuidantService.ajouterGroupe(gp).
      subscribe(() => this.chargerGroupes());
  };
  chargerGroupes() {
    this.etuidantService.listeGroupes().
      subscribe(gp => {
        this.groupes = gp._embedded.groupes;
        console.log(gp);
      });
  }
  updateGroupe(gp: Groupe) {
    this.updatedGroupe = gp;
    this.ajout=false; 
  }
}
