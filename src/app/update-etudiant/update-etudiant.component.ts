import { Component, OnInit } from '@angular/core';
import { Etudiant } from '../model/etudiant.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EtudiantService } from '../services/etudiant.service';
import { Groupe } from '../model/groupe.model';

@Component({
  selector: 'app-update-etudiant',
  templateUrl: './update-etudiant.component.html',
  styles: [
  ]
})
export class UpdateEtudiantComponent implements OnInit {
  currentEtudiant = new Etudiant();
  groupes!: Groupe[];
  updatedGroupeId!: number;
  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    private etudiantService: EtudiantService) { }
  ngOnInit(): void {
    this.etudiantService.listeGroupes().
      subscribe(gp => {
        this.groupes = gp._embedded.groupes;
        console.log(gp);
      });
    this.etudiantService.consulterEtudiant(this.activatedRoute.snapshot.params['id']).
      subscribe(etud => {
        this.currentEtudiant = etud;
        this.updatedGroupeId = this.currentEtudiant.groupe.idGroupe;
      });
  }

  updateEtudiant() {
    this.currentEtudiant.groupe = this.groupes.
      find(gp => gp.idGroupe == this.updatedGroupeId)!;
    this.etudiantService.updateEtudiant(this.currentEtudiant).subscribe(etud => {
      this.router.navigate(['etudiants']);
    }
    );
  }


}
