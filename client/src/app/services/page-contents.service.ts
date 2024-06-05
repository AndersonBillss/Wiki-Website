import { Injectable, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PageContentsService {
  private apiUrl: string = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  getPageList(){
    const url: string = `${this.apiUrl}/api/pageList`
    const res = this.http.get<any>(url)
    return res
  }

  getPageContents(title: string){
    const url: string = `${this.apiUrl}/api/getPageContents?title=${title}`
    const res = this.http.get<any[]>(url)
    return res
  }

  savePageContents(title: string, contents: any[]){
    const url: string = `${this.apiUrl}/api/updatePageContents`
    const res = this.http.post(url, {
      title: title,
      contents: contents
    })
    return res
  }


}
