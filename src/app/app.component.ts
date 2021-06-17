import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from './api-service.service';
import { CustomAgmMarker } from './custom-marker';
import { GoogleMapsAPIWrapper, MarkerManager} from '@agm/core';
import { Observable } from 'rxjs';
import { timer } from 'rxjs';
import { AnimalPosition } from './animal-position';
import { Animals } from './Animals-Model';
import {Animal} from './Animal'
import { DangerCategories } from './danger-categories.enum';
import { FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'trackerUI';
  latitude = 29.9917;
  longitude = 78.2896;
  animals = [
		

		{	"id":200,
			"name":"Deer",
			"heartRate" : "82 bpm", 
			"Latitude": "28.654070",
      "Longitude": " 77.272659",
			"Temperature": 98
		},
    {	"id":300,
    "name":"Tiger",
    "heartRate" : "82 bpm", 
    "Latitude": "28.654169", 
    "Longitude": "77.272212",
    "Temperature": 98
  },
  {	"id":400,
  "name":"Wolf",
  "heartRate" : "82 bpm", 
  "Latitude": "28.6537166",
  "Longitude": "77.269384",
  "Temperature": 98
},
{	"id":600,
"name":"Elephant",
"heartRate" : "82 bpm", 
"Latitude": "28.654220", 
"Longitude": "77.269559",
"Temperature": 98
}
    

    

    
	];
  showAnimalStatus = false;
  greenCircleLat = 28.654067;
  greenCircleLong = 77.270936;
  circleLat = 28.653483;
  circleLong = 77.271218;
  circleRadius = 20;
  Latitude = 28.6537965;
  Longitude = 77.2712901;
  type = 'satellite';
  subscription: any;
  animate=null;
  markerCount;
  animalPostion :AnimalPosition
  currentPos = {
    lat: 29.991696,
    lng: 78.289420
  };
  markers=[];
  mockTemp = new FormControl();
  newAnimalsData;
  newDynamicLocation: Animal;
  dangerCategory = [];
  selectedAnimal: Animal;
  slideTogglecolor: ThemePalette = 'warn';
constructor(private apiService:ApiServiceService, public mapsWrapper: GoogleMapsAPIWrapper,
  public  markerManager: MarkerManager){
}
  async ngOnInit() {
    this.mockTemp.setValue(true);
    this.newDynamicLocation = new Animal();
     this.newDynamicLocation.id=100;
     this.newDynamicLocation.name="Panda";
     this.newDynamicLocation.heartRate=80;

    console.log(this.animals);
     this.subscription = timer(1000,1000)
       .subscribe(() => {

        this.apiService.getDynamic().subscribe(val => {

          console.log(val);
          this.newDynamicLocation.Latitude = val.Latitude;
          this.newDynamicLocation.Longitude = val.Longitude;
          this.newDynamicLocation.Temperature = val.Temperature
          console.log(this.newDynamicLocation);

          this.dangerCategory = [];
          this.getDangerZoneStatus(this.newDynamicLocation,this.circleLat,this.circleLong);

          
          //this.getDangerZoneStatus(this.newDynamicLocation,this.greenCircleLat,this.greenCircleLong);
            //  await this.apiService.getAll().subscribe(val => {
  //   console.log(val);
  //   this.animals = val;
  //   //this.markerCount = val.length;
  //   console.log(this.animals);
  //   console.log(this.markerCount);
  //   
  //   
  // //  this.trackAnimalPosition(this.animals);
  // //  this.buildMarkers(this.animals);

  //   });
        })

       })
   
  }

  public customStyle = [{  
    "featureType": "poi.medical",  
    "elementType": "all",  
    "stylers": [{  
        visibility: "off",  
    }]  
}, ];  

markerClicked(animal:Animal) {
  console.log('clicked'); 
  
  this.selectedAnimal = animal;
  this.showAnimalStatus=true;


  //console.log($event);
  //animal.showPath = true;

}


points = [];


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

// updateAnimalLocations(newAnimalsData){

//   newAnimalsData.forEach(newAnimal => {

//     this.animals.forEach(animal => {

//       if(newAnimal.id == animal.id){

//         animal.previousLocations.push(animal.location);
//         animal.location = newAnimal.location;

//       }
      
//     });
    
//   });
  

// }

onMouseOver(infoWindow, gm) {

  if (gm.lastOpen != null) {
      gm.lastOpen.close();
  }

  gm.lastOpen = infoWindow;

  infoWindow.open();
}


getDangerZoneStatus(marker,circleLat,circleLong){

  let isInRedZone = this.getDistanceBetween(marker.Latitude,marker.Longitude,circleLat,circleLong,this.circleRadius);
if(isInRedZone){
  this.dangerCategory.push(DangerCategories.InRedZone);
}

  let isInBlueZone = this.getDistanceBetween(marker.Latitude,marker.Longitude,this.greenCircleLat,this.greenCircleLong,this.circleRadius);
if(isInBlueZone){
  this.dangerCategory.push(DangerCategories.isInBlueZone);
}

//let isHabitatSuitable = false;
  let isHabitatSuitable = this.getHabitatHazardStatus(marker.Temperature);
  if(isHabitatSuitable){
    this.dangerCategory.push(DangerCategories.isInHabitatHazard);
  }
  
  let isInDanger = false;
  if(isInRedZone || isInBlueZone || isHabitatSuitable){
    isInDanger = true;
    this.newDynamicLocation.isInDanger = true;
  this.animate='BOUNCE';
  }else{
  this.animate=null;
  }
return isInDanger;
}


getDistanceBetween(lat1,long1,lat2,long2,radius){
  var from = new google.maps.LatLng(lat1,long1);
  var to = new google.maps.LatLng(lat2,long2);

  if(google.maps.geometry.spherical.computeDistanceBetween(from,to) <= radius){    
    console.log('Radius',radius);
    console.log('Distance Between',google.maps.geometry.spherical.computeDistanceBetween(
      from,to
    ));
    return true;
  }else{
    return false;
  }
}

showinfo(index: number) {
  this.markersholder[index].display = true;
}

getShowAnimalStatus(){

  return this.showAnimalStatus;
}


markersholder:any[] = [{
  display:false,
   lat:0,
   lng:0
}]



getHabitatHazardStatus(temp){

  
  if(this.mockTemp.value==false){
    return false;
  }else{
  if(temp>65){

    return true;
  }else{
    return false;
  }
}}

getIconURL(animal){

  switch(animal.name){

    case 'Tiger':
      return '/assets/tiger-icon.svg';
      break;
    case 'Deer' :
      return '/assets/deer.svg';
      break; 
    case 'Elephant' :
      return '/assets/elephant.svg';
      break;
    case 'Wolf' : 
      return '/assets/wolf.svg';
      break;
  }
  
}

}
