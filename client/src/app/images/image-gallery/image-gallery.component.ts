import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import { NavbarComponent } from '../../navbar/navbar.component';

import { ImagesService } from '../../services/images.service';

import { ImageUploadComponent } from '../image-upload/image-upload.component';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../icon/icon.component';
import { SearchBoxComponent } from '../../navbar/search-box/search-box.component';


@Component({
  selector: 'app-image-gallery',
  standalone: true,
  imports: [
    NavbarComponent,
    CommonModule,
    RouterModule,

    ImageUploadComponent,
    IconComponent,
    SearchBoxComponent,
  ],
  templateUrl: './image-gallery.component.html',
  styleUrl: './image-gallery.component.css'
})
export class ImageGalleryComponent implements OnInit {
  newImg: File | null = null
  selectedGallery: string = ''
  images: any = []

  addingNewImage: boolean = false

  
  constructor(
    private router: Router,
    private imagesService: ImagesService
  ) {}

  ngOnInit(): void {

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.setUrl()
    });
    this.setUrl()
  }

  setUrl(){
    const routeName = '/images'
    let route = this.router.url;
    const galleryPage = route.slice(routeName.length, route.length)

    if(galleryPage.trim() !== ''){
      this.selectedGallery = galleryPage.slice(1,galleryPage.length)
    }
  }

  openImageUpload(){
    this.addingNewImage = true
  }




  addImage(image: any){
    this.imagesService.uploadImage(this.selectedGallery, image).subscribe(data => {
      console.log(data)
    })
  }
}
