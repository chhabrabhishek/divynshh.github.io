import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Animals} from './Animals-Model'


@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  apiURL: string = 'https://my-json-server.typicode.com/divynshh/demo';
  constructor(private httpClient: HttpClient) { }
  locations;

  public getAll(){
  return  this.httpClient.get<Animals[]>(`${this.apiURL}/Animals`);
    
  }

}
