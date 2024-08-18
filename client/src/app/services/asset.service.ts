import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AssetService {
  private apiUrl: string = environment.apiUrl
  token: string | null = localStorage.getItem('token')
  authHeaders: HttpHeaders;

  constructor( 
    private http: HttpClient
  ) { 
    this.authHeaders = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
  }

  getFolders(){
    this.authHeaders = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem("token")}`
    });
    const url = `${this.apiUrl}/api/getAssetFolders`
    const res = this.http.get<any>(url, {headers: this.authHeaders})
    return res
  }

  addFolder(title: string, tags: []){
    this.authHeaders = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem("token")}`
    });
    const url = `${this.apiUrl}/api/addAssetFolder`
    const res = this.http.post<any>(url, { assetFolder: { title, tags } }, {headers: this.authHeaders})
    return res
  }
}
