import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from './api-service.service';
import { CustomAgmMarker } from './custom-marker';
import { GoogleMapsAPIWrapper, MarkerManager} from '@agm/core';
import { Observable } from 'rxjs';
import { timer } from 'rxjs';
import { AnimalPosition } from './animal-position';
import { Animals } from './Animals-Model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'trackerUI';
  latitude = 29.9917;
  longitude = 78.2896;
  animals;
  type = 'satellite';
  subscription: any;
  markerCount;
  animalPostion :AnimalPosition
  currentPos = {
    lat: 29.991696,
    lng: 78.289420
    
  };
  markers=[];
  newAnimalsData;

constructor(private apiService:ApiServiceService, public mapsWrapper: GoogleMapsAPIWrapper,
  public  markerManager: MarkerManager){
}
  async ngOnInit() {
   await this.apiService.getAll().subscribe(val => {
    console.log(val);
    this.animals = val;
    this.markerCount = val.length;
    console.log(this.animals);
    console.log(this.markerCount);

    this.trackAnimalPosition(this.animals);
  //  this.buildMarkers(this.animals);

    });

    let i = 0;


     this.subscription = timer(8000,4000)
       .subscribe(() => {

        this.apiService.getAll().subscribe(val => {
          console.log(val);
          this.newAnimalsData = val;
          this.markerCount = val.length;
          console.log(this.newAnimalsData);
          console.log(this.markerCount);
          
          if(this.markerCount == this.animals.length){

            this.updateAnimalLocations(this.newAnimalsData);

          }else{
         //   this.addNewAnimals(this.newAnimalsData);
          }
         // this.trackAnimalPosition(this.animals);
      
          });
         if(i>this.points.length){
          this.subscription.unsubscribe();
         }
       })
   
  }

  public customStyle = [{  
    "featureType": "poi.medical",  
    "elementType": "all",  
    "stylers": [{  
        visibility: "off",  
    }]  
}, ];  

markerClicked($event: MouseEvent,animal:Animals) {
  console.log('clicked'); 
  console.log($event);
  animal.showPath = true;

}


points = [];
tmpPoints = [
  this.currentPos,
  {
   
    lat:29.99161,lng:78.2893434
  },
  {
    lat:29.991722,  lng:78.289379
  },
  {
    
    lat:  29.991740, lng:78.289377
  },
  {
    lat:29.991742,  lng:78.289350
  },
  {
 
    lat: 29.991735,lng: 78.289362
  }
]

trackAnimalPosition(animals:any){

  animals.forEach(animal => {
 let animalPostion = new AnimalPosition();
    animalPostion.id = animal.id;
    animalPostion.name = animal.name;
    animalPostion.previousLocations.push(animal.location);
    
    animal.previousLocations = animalPostion.previousLocations;
    
  });


}
 buildMarkers(animals:any){

  animals.forEach(animal => {

    const agmMarker = new CustomAgmMarker(animal.id, this.markerManager);
    agmMarker.latitude =  animal.location.lat
    agmMarker.longitude =  animal.location.lng;
    agmMarker.visible = true;
    agmMarker.label = animal.name;
    this.markers.push(agmMarker)
    this.markerManager.addMarker(agmMarker);

    
  });


 }

updateAnimalLocations(newAnimalsData){

  newAnimalsData.forEach(newAnimal => {

    this.animals.forEach(animal => {

      if(newAnimal.id == animal.id){

        animal.previousLocations.push(animal.location);
        animal.location = newAnimal.location;

      }
      
    });
    
  });
  

}

onMouseOver(infoWindow, gm) {

  if (gm.lastOpen != null) {
      gm.lastOpen.close();
  }

  gm.lastOpen = infoWindow;

  infoWindow.open();
}

}
