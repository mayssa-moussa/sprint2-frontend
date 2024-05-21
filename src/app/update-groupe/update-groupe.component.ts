import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Groupe } from '../model/groupe.model';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'app-update-groupe',
  templateUrl: './update-groupe.component.html',
  styles: [
  ]
})
export class UpdateGroupeComponent {
  @Input()
  groupe! : Groupe;
  @Output()
  groupeUpdated = new EventEmitter<Groupe>();
  @Input()
  ajout!:boolean;
  constructor(){};
  ngOnInit(): void {
    console.log("ngOnInit du composant UpdateGroupe ",this.groupe);
    }
  saveGroupe(){
    this.groupeUpdated.emit(this.groupe);
  };
}
