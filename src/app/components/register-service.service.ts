import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../classes/User';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { log } from 'console';
const USER_NAME = 'currentUser';
const USER_PASSWORD = 'currentPassword';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
public usernameSource = new BehaviorSubject<string>("לא מחובר");
 username$ = this.usernameSource.asObservable();
//  public username:string="לא מחובר";

  public registerCode = 5;
  defaultUser: any;
  saveCurrentUser(name: string, password: string) {
    sessionStorage.setItem(USER_NAME, JSON.stringify(name));
    sessionStorage.setItem(USER_PASSWORD, JSON.stringify(password));
    this.changeName();
  }

  getCurrentUser(): any {
    const name= JSON.parse(sessionStorage.getItem(USER_NAME) || '{}');
    const password= JSON.parse(sessionStorage.getItem(USER_PASSWORD) || '{}');
    const user={"name":name,"password":password};
    console.log(user);
    return user;
  }
  clearCurrentUser() {
    sessionStorage.removeItem(USER_NAME);
    sessionStorage.removeItem(USER_PASSWORD);
  }
  
  RegisterPlus(){
    this.registerCode+=1;
  }
  RegisterMinus(){
    this.registerCode-=1;
  }
  private apiUrl = 'https://localhost:44329/api/User';

  constructor(private http: HttpClient) { }

  login(name: string, password: string) {
    const loginDto = { name: name, password: password };
    const res= this.http.post<boolean>(`${this.apiUrl}/Login`, loginDto);
    console.log(res);
    return res;
    // return this.http.post(`${this.apiUrl}/login`, { "name" : name, "password" : password });
  }
  getRegisters():Observable<User[]>{
      return this.http.get<User[]>(this.apiUrl);
  }
  register(newUser: User) {
    return this.http.post(this.apiUrl, newUser);
  }
  getUserByNameAndPass(user:any){
    return this.http.post(`${this.apiUrl}/UserByNameAndPassword`,user)
  }
  changeName() {
    const username = JSON.parse(sessionStorage.getItem("currentUser") || "{}");
    if(username)
    this.usernameSource.next(username);
  else
  this.usernameSource.next("לא מחובר");
  }
  
  }