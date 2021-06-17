import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Animal } from '../Animal';
import { Animals } from '../Animals-Model';

@Component({
  selector: 'app-animal-status',
  templateUrl: './animal-status.component.html',
  styleUrls: ['./animal-status.component.scss']
})
export class AnimalStatusComponent implements OnInit {

  isInDanger= false;
  @Input() public animal : Animal;
  @Input() public showAnimalStatus : Boolean;
  @Input() public dangerCategories : [];

  openSnackBar(message: string) {
    this._snackBar.open(message,'OK', {
      duration: 3000
    });
    
  }
  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

    

  }

  getIsInDanger(){
    if(this.animal.isInDanger == true){
      this.isInDanger = true;
    }else{
      this.isInDanger = false;
    }
    return this.isInDanger;
  }

}
