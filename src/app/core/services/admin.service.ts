import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICreateAdmin, ICreateRole } from '../model/userRequest.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private baseUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient) {}

  public getAllUser() {
    return this.httpClient.get(this.baseUrl + `/user`);
  }

  public getAllShifts() {
    return this.httpClient.get(this.baseUrl + `/Users-shift`);
  }
  public getAllUsersRoles() {
    return this.httpClient.get(this.baseUrl + `/userroles`);
  }

  public getAllDept() {
    return this.httpClient.get(this.baseUrl + `/departments`);
  }

  public createDept(payload: any) {
    return this.httpClient.post(this.baseUrl + `/create-dept`, payload);
  }

  public updateDept(payload: any) {
    return this.httpClient.patch(this.httpClient + `/create-dept`, payload);
  }

  public createAdmin(payload: ICreateAdmin) {
    return this.httpClient.post(this.baseUrl + `/admin-user`, payload);
  }

  public getAllAdmin() {
    return this.httpClient.get(this.baseUrl + `/admin`);
  }

  public updateAdmin(payload: any) {
    return this.httpClient.patch(this.baseUrl + ``, payload);
  }

  public createRoles(payload: any) {
    return this.httpClient.post(this.baseUrl + `/create-roles`, payload);
  }

  public updateRoles(payload: any) {
    return this.httpClient.patch(this.baseUrl + `/create-roles`, payload);
  }

  public getRoles() {
    return this.httpClient.get(this.baseUrl + `/roles`);
  }
}
