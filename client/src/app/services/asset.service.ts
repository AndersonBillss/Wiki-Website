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

  getAssetFolderContents(title: string){
    this.authHeaders = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });
    const url = `${this.apiUrl}/api/getAssetFolderContents?title=${title}`
    const res = this.http.get<any>(url, {headers: this.authHeaders})
    return res
  }

  addAssetItem(title: string, assetObject: any){
    console.log(assetObject)
    this.authHeaders = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });
    //You have to have images in a formData object
    const formData = new FormData()
    formData.append("type", assetObject.type)
    formData.append("title", assetObject.title)
    if(assetObject.type === "Image"){
      formData.append("src", assetObject.src)
    } else if(assetObject.type === "Animation"){
      formData.append("srcArray", JSON.stringify(assetObject.srcArray))
    }
    const url = `${this.apiUrl}/api/addAssetItem?title=${title}`
    const res = this.http.post<any>(url, formData, {headers: this.authHeaders})
    return res
  }
}
