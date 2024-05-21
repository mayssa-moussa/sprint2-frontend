import { Component, OnInit } from '@angular/core';
import { Etudiant } from '../model/etudiant.model';
import { EtudiantService } from '../services/etudiant.service';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  styles: [
  ]
})
export class RechercheParNomComponent implements OnInit {
  nomEtudiant!: string;
  etudiants!: Etudiant[];
  searchTerm!: string;
  allEtudiants! : Etudiant[];

  constructor(private etudiantService: EtudiantService){}
  ngOnInit(): void {
    this.etudiantService.listeEtudiant().subscribe(etud => {
      console.log(etud);
      this.etudiants =etud;
      });
  }
  rechercherEtudiants() {
    this.etudiantService.rechercherParNom(this.nomEtudiant)
    .subscribe(etud => {this.etudiants = etud;
        console.log(etud)
      });
  }
  onKeyUp(filterText : string){
    this.etudiants = this.allEtudiants.filter(item =>item.nom.toLowerCase().includes(filterText));
    }

}
