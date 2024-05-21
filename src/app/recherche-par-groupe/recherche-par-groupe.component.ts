import { Component, OnInit } from '@angular/core';
import { Etudiant } from '../model/etudiant.model';
import { Groupe } from '../model/groupe.model';
import { EtudiantService } from '../services/etudiant.service';

@Component({
  selector: 'app-recherche-par-groupe',
  templateUrl: './recherche-par-groupe.component.html',
  styles: [
  ]
})
export class RechercheParGroupeComponent implements OnInit {
  etudiants!: Etudiant[];
  IdGroupe!: number;
  groupes!: Groupe[];
  constructor(private etudiantService: EtudiantService) { }
  ngOnInit(): void {
    this.etudiantService.listeGroupes().
      subscribe(gp => {
        this.groupes = gp._embedded.groupes;
        console.log(gp);
      });
  }
  onChange() {
    this.etudiantService.rechercherParGroupe(this.IdGroupe).
    subscribe(etud =>{this.etudiants=etud});
    }

}
