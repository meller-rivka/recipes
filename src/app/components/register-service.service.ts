import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../classes/User';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  public registerCode = 5;
  public currentUser="לא מחובר";
  public defaultUser="";

  getCurrentUser(){
    return this.currentUser;
  }
  RegisterPlus(){
    this.registerCode+=1;
  }
  RegisterMinus(){
    this.registerCode-=1;
  }
  private apiUrl = 'https://localhost:7090/api/User';

  constructor(private http: HttpClient) { }

  login(name: string, password: string) {
    const loginDto = { name: name, password: password };
    const res= this.http.post<boolean>(`${this.apiUrl}/Login`, loginDto);
    console.log(res);
    return res;
    
    // return this.http.post(`${this.apiUrl}/login`, { "name" : name, "password" : password });
  }

  register(newUser: User) {
    return this.http.post(this.apiUrl, newUser);
  }
}