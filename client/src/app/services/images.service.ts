import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  private apiUrl: string = environment.apiUrl

  constructor( 
    private http: HttpClient
  ) { }

  getImages(pageName: string){
    
  }
  uploadImage(pageName: string, image: any){
    const formData = new FormData();
    formData.append('src', image.src);
    formData.append('title', image.title);
    formData.append('tags', JSON.stringify(image.tags));

    const url: string = `${this.apiUrl}/api/uploadImage?pageName=${pageName}`
    const res = this.http.post<any>(url, formData)
    return res
  }
}
