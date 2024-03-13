import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../classes/User';
const USER_KEY = 'currentUser';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  public registerCode = 5;
  public currentUser="לא מחובר";
  public defaultUser="";
  saveCurrentUser(userDetails: any) {
    sessionStorage.setItem(USER_KEY, JSON.stringify(userDetails));
  }

  getCurrentUser(): any {
    return JSON.parse(sessionStorage.getItem(USER_KEY) || '{}');
  }

  clearCurrentUser() {
    sessionStorage.removeItem(USER_KEY);
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