import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Etudiant } from '../model/etudiant.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Groupe } from '../model/groupe.model';
import { apiURL } from '../config';
import { GroupeWrapper } from '../model/GroupeWrapped.model';
import { apiURLGp } from '../config';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {


  //groupes: Groupe[];
  etudiants!: Etudiant[];
  //etudiant!: Etudiant;

  constructor(private http: HttpClient, private authService: AuthService) {
    /* this.groupes = [
      { idGroupe: 1, nomGroupe: "groupe1" },
      { idGroupe: 2, nomGroupe: "groupe2" }
    ]; */
    /* this.etudiants = [
      {
        idEtudiant: 1, nomEtudiant: "makhlouf", prenomEtudiant: "ahmed",
        dateNaissance: new Date("01/14/2011"), groupe: { idGroupe: 1, nomGroupe: "groupe1" }
      },
      {
        idEtudiant: 2, nomEtudiant: "sellem", prenomEtudiant: "maryem",
        dateNaissance: new Date("12/17/2002"), groupe: { idGroupe: 1, nomGroupe: "groupe1" }
      },
      {
        idEtudiant: 3, nomEtudiant: "moussa", prenomEtudiant: "mayssa",
        dateNaissance: new Date("02/20/2003"), groupe: { idGroupe: 2, nomGroupe: "groupe2" }
      }
    ]; */
  }


  listeEtudiant(): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(apiURL + "/all");
  }

  ajouterEtudiant(etud: Etudiant): Observable<Etudiant> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.post<Etudiant>(apiURL + "/addetud", etud, { headers: httpHeaders });
  }


  supprimerEtudiant(id: number) {
    const url = `${apiURL}/deletud/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.delete(url, { headers: httpHeaders });

  }

  consulterEtudiant(id: number): Observable<Etudiant> {
    const url = `${apiURL}/getbyid/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<Etudiant>(url, { headers: httpHeaders });
  }

  trierEtudiants() {
    this.etudiants = this.etudiants.sort((n1, n2) => {
      if (n1.idEtudiant > n2.idEtudiant) {
        return 1;
      }
      if (n1.idEtudiant < n2.idEtudiant) {
        return -1;
      }
      return 0;
    });
  }

  updateEtudiant(etud: Etudiant): Observable<Etudiant> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.put<Etudiant>(apiURL + "/updateetud", etud, { headers: httpHeaders });
  }
  listeGroupes(): Observable<GroupeWrapper> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<GroupeWrapper>(apiURLGp, { headers: httpHeaders }
    );
  }

  rechercherParGroupe(idGroupe: number): Observable<Etudiant[]> {
    const url = `${apiURL}/etudgp/${idGroupe}`;
    return this.http.get<Etudiant[]>(url);
  }
  rechercherParNom(nom: string): Observable<Etudiant[]> {
    const url = `${apiURL}/etudByName/${nom}`;
    return this.http.get<Etudiant[]>(url);
  }
  ajouterGroupe(gp: Groupe): Observable<Groupe> {
    return this.http.post<Groupe>(apiURLGp, gp, httpOptions);
  }
}


