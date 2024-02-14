import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICreateAdmin } from '../model/userRequest.model';

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

  public createAdmin(payload: ICreateAdmin){
    return this.httpClient.post(this.baseUrl+`/admin-user`, payload)
  }

  public getAllAdmin(){
    return this.httpClient.get(this.baseUrl+`/admin`)
  }

  public updateAdmin(payload: any){
    return this.httpClient.patch(this.baseUrl+``, payload)
  }
}
