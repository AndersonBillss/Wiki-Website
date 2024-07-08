import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class CachedImagesService {
    cachedImages: any[] = []
    private apiUrl: string = environment.apiUrl
    token: string | null = localStorage.getItem('token')
    authHeaders: HttpHeaders;

    constructor(private http: HttpClient){
        this.authHeaders = new HttpHeaders({
            'Authorization': `Bearer ${this.token}`
          });
    }
    
    setCachedImages(imageArray: any[]){
        this.cachedImages = imageArray
    }
    
    getCachedImage(imageId: string): string{
        let selectedImageSrc = ''
        this.cachedImages.forEach(image => {
            if(image._id === imageId){
                selectedImageSrc = image.medResSrc
            }
        })
    
        return selectedImageSrc
    }
    
    async getNewImage(imageLocation: any): Promise<any> {
        const pageName = imageLocation.pageName;
        const imageId = imageLocation._id;
    
        const url = `${this.apiUrl}/api/getImage?pageName=${pageName}&id=${imageId}&resolution=med`;
        let imageResponse = { medResSrc: '', _id: '' };
    
        try {
            this.authHeaders = new HttpHeaders({
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            });
            const res = await this.http.get<any>(url, {headers: this.authHeaders}).toPromise();
            imageResponse = res.images;
            this.cachedImages.push(imageResponse);
        } catch (error) {
            console.error("Error fetching image:", error);
        }
    
        return imageResponse;
    }
}

