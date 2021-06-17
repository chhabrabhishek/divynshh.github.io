import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Animal } from '../Animal';
import { Animals } from '../Animals-Model';
import {MatDialog} from '@angular/material/dialog';
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
  constructor(private _snackBar: MatSnackBar,public dialog: MatDialog) { }

  ngOnInit(): void {

    

  }

  isDeer(animal){
    if(animal.name=='Deer'){
      return true;
    }else{
      return false;
    }
  }

  getIsInDanger(){
    if(this.animal.isInDanger == true){
      this.isInDanger = true;
    }else{
      this.isInDanger = false;
    }
    return this.isInDanger;
  }


  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
  }

}
  
  
  @Component({
    selector: 'dialog-elements-example-dialog',
    templateUrl: 'dialog-elements-example-dialog.html',
  })
  export class DialogElementsExampleDialog {

    constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message: string) {
    this._snackBar.open(message,'OK', {
      duration: 3000
    });
    
  }
  }
