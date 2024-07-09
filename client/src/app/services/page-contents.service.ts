import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PageContentsService {
  private apiUrl: string = environment.apiUrl
  token: string | null = localStorage.getItem('token')
  authHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    this.authHeaders = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
  }

  getPageList(){
    this.authHeaders = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });
    const url: string = `${this.apiUrl}/api/pageList`
    const res = this.http.get<any>(url, {headers: this.authHeaders})
    return res
  }

  getPageContents(title: string){
    this.authHeaders = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });
    const url: string = `${this.apiUrl}/api/getPageContents?title=${title}`
    const res = this.http.get<any[]>(url, {headers: this.authHeaders})
    return res
  }

  savePageContents(title: string, contents: any[]){
    this.authHeaders = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });
    const url: string = `${this.apiUrl}/api/updatePageContents`
    const res = this.http.post(
      url, 
      {
        title: title,
        contents: contents
      },
      {headers: this.authHeaders}
  )
    return res
  }

  deletePage(title: string){
    this.authHeaders = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });
    const url: string = `${this.apiUrl}/api/deletePage?title=${title}`
    const res = this.http.delete(url, {headers: this.authHeaders})
    return(res)
  }

  startEditing(pageName: string){
    this.authHeaders = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });
    const url: string = `${this.apiUrl}/api/startEditing?pageName=${pageName}`
    const res = this.http.get(url, {headers: this.authHeaders})
    return(res)
  }

}
