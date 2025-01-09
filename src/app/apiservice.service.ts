import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor() { }

  public apiUrl = 'https://webspaarkapi.azurewebsites.net/api';
  public jobApi = this.apiUrl + '/jobs';
  public blogApi = this.apiUrl + '/blogs';
  public enquire = this.apiUrl + '/Registration';
}
