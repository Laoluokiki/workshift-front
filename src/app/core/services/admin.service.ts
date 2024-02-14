import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = environment.baseUrl;
  constructor(
    private httpClient: HttpClient
  ) { }

  public getAllUser(){
    return this.httpClient.get(this.baseUrl+`/user`)
  }

  public getAllDept() {
    return this.httpClient.get(this.baseUrl+`/departments`)
  }
}
