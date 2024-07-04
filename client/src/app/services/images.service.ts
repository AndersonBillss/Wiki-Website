import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ImagesService {
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

  getImages(pageName: string){
    const url = `${this.apiUrl}/api/getImages?pageName=${pageName}`
    const res = this.http.get<any>(url, {headers: this.authHeaders})
    return res
  }
  getImage(pageName: string, imageId: string){
    const url = `${this.apiUrl}/api/getImage?pageName=${pageName}&id=${imageId}`
    const res = this.http.get<any>(url, {headers: this.authHeaders})
    return res
  }
  getImageList(pageName?: string){
    const query = pageName?`?pageName=${pageName}`:''
    const url = `${this.apiUrl}/api/imageList${query}`
    const res = this.http.get<any>(url, {headers: this.authHeaders})
    return res
  }

  updateImage(pageName: string, image: any){
    const requestObject = {
      _id: image._id,
      title: image.title,
      tags: image.tags,
    }
    const url: string = `${this.apiUrl}/api/updateImage?pageName=${pageName}`
    const res = this.http.post<any>(url, requestObject, {headers: this.authHeaders})
    return res
  }
  uploadImage(pageName: string, image: any){
    const formData = new FormData();
    formData.append('src', image.src);
    formData.append('title', image.title);
    formData.append('tags', JSON.stringify(image.tags));

    const url: string = `${this.apiUrl}/api/uploadImage?pageName=${pageName}`
    const res = this.http.post<any>(url, formData, {headers: this.authHeaders})
    return res
  }

  getTagList(pageName?: string){
    const query = pageName?`?pageName=${pageName}`:''
    const url = `${this.apiUrl}/api/getTags${query}`
    const res = this.http.get(url, {headers: this.authHeaders})
    return res
  }

  deleteImage(pageName: string, _id: string){
    const url = `${this.apiUrl}/api/deleteImage?pageName=${pageName}&id=${_id}`
    const res = this.http.delete(url, {headers: this.authHeaders})
    return res
  }
}
