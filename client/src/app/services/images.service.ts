import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  private apiUrl: string = environment.apiUrl

  constructor() { }

  getImages(pageName: string){
    
  }
  uploadImage(pageName: string, image: File){

  }
}
