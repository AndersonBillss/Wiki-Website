import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PageContentsService {
  private apiUrl: string = environment.apiUrl

  constructor(private http: HttpClient) {
    console.log(environment.production)
   }

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

  deletePage(title: string){
    console.log('this.deletePage')
    const url: string = `${this.apiUrl}/api/deletePage?title=${title}`
    this.http.delete(url).subscribe()
  }


}
