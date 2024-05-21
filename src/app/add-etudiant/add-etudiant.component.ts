import { Component, OnInit } from '@angular/core';
import { Etudiant } from '../model/etudiant.model';
import { EtudiantService } from '../services/etudiant.service';
import { Groupe } from '../model/groupe.model';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-add-etudiant',
  templateUrl: './add-etudiant.component.html'
})
export class AddEtudiantComponent implements OnInit {
  newEtudiant = new Etudiant();
  message!: string;
  groupes!: Groupe[];
  newIdGroupe!: number;
  newGroupe!: Groupe;

  constructor(private activatedRoute: ActivatedRoute,private router :Router,private etudiantService: EtudiantService) { }

  ngOnInit(): void {
    this.etudiantService.listeGroupes().subscribe(gp => {this.groupes = gp._embedded.groupes;
    console.log(gp);
    });
    }


  addEtudiant(){
    this.newEtudiant.groupe = this.groupes.find(gp => gp.idGroupe == this.newIdGroupe)!;
    this.etudiantService.ajouterEtudiant(this.newEtudiant).subscribe(etud => {
    console.log(etud);
    this.router.navigate(['etudiants']);
    });
    }

  }

