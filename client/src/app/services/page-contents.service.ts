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

  getPageList(section: string){
    this.authHeaders = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });
    const url: string = `${this.apiUrl}/api/pageList?section=${section}`
    const res = this.http.get<any>(url, {headers: this.authHeaders})
    return res
  }

  getPageContents(section: string, title: string){
    //encode the title before sending
    title = encodeURI(title)
    this.authHeaders = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });
    const url: string = `${this.apiUrl}/api/getPageContents?title=${title}&section=${section}`
    const res = this.http.get<any[]>(url, {headers: this.authHeaders})
    return res
  }

  savePageContents(section: string, title: string, contents: any[]){
    this.authHeaders = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });
    const url: string = `${this.apiUrl}/api/updatePageContents?section=${section}`
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

  deletePage(section: string, title: string){
    this.authHeaders = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });
    const url: string = `${this.apiUrl}/api/deletePage?title=${title}&section=${section}`
    const res = this.http.delete(url, {headers: this.authHeaders})
    return(res)
  }

  startEditing(section: string, pageName: string){
    this.authHeaders = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });
    const url: string = `${this.apiUrl}/api/startEditing?pageName=${pageName}&section=${section}`
    const res = this.http.get(url, {headers: this.authHeaders})
    return(res)
  }


  stopEditing(){
    this.authHeaders = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });
    const url: string = `${this.apiUrl}/api/stopEditing`
    this.http.get(url, {headers: this.authHeaders}).subscribe()
  }
}
