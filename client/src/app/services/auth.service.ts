import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = environment.apiUrl

  constructor( 
    private http: HttpClient
  ) { }

  logIn(userName: string){
    const res = this.http.post(`${this.apiUrl}/api/logIn`, {
      userName: userName
    })

    return res
  }

  signUp(userName: string){
    const res = this.http.post(`${this.apiUrl}/api/signUp`, {
      userName: userName
    })

    return res
  }


}
