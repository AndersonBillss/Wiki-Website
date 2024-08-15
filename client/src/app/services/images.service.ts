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

  getImages(){
    this.authHeaders = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });
    const url = `${this.apiUrl}/api/getImages`
    const res = this.http.get<any>(url, {headers: this.authHeaders})
    return res
  }
  getImage(imageId: string){
    this.authHeaders = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });
    const url = `${this.apiUrl}/api/getImage?id=${imageId}`
    const res = this.http.get<any>(url, {headers: this.authHeaders})
    return res
  }
  
  getImageList(){
    this.authHeaders = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });
    const url = `${this.apiUrl}/api/imageList`
    const res = this.http.get<any>(url, {headers: this.authHeaders})
    return res
  }

  updateImage(image: any){
    this.authHeaders = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });
    const requestObject = {
      _id: image._id,
      title: image.title,
      tags: image.tags,
    }
    const url: string = `${this.apiUrl}/api/updateImage`
    const res = this.http.post<any>(url, requestObject, {headers: this.authHeaders})
    return res
  }
  uploadImage(image: any){
    this.authHeaders = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });
    const formData = new FormData();
    formData.append('src', image.src);
    formData.append('title', image.title);
    formData.append('tags', JSON.stringify(image.tags));

    const url: string = `${this.apiUrl}/api/uploadImage`
    const res = this.http.post<any>(url, formData, {headers: this.authHeaders})
    return res
  }

  getTagList(){
    this.authHeaders = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });
    const url = `${this.apiUrl}/api/getTags`
    const res = this.http.get(url, {headers: this.authHeaders})
    return res
  }

  deleteImage(_id: string){
    this.authHeaders = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });
    const url = `${this.apiUrl}/api/deleteImage?id=${_id}`
    const res = this.http.delete(url, {headers: this.authHeaders})
    return res
  }
}
