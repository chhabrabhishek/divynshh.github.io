import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Animals} from './Animals-Model'
import { Animal } from './Animal';


@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  //apiURL: string = 'https://my-json-server.typicode.com/divynshh/demo';
  apiURL: string = 'http://localhost:3002';
  consumerApiURL: string = 'http://localhost:3001';
  constructor(private httpClient: HttpClient) { }
  locations;

  public getAll(){
 // return  this.httpClient.get<Animal[]>(`${this.apiURL}/Animals`);
 return  this.httpClient.get('../../assets/db.json');
  
  }

  public getDynamic(){
    return  this.httpClient.get<Animal>(`${this.consumerApiURL}/Location`);
      
    }

}
