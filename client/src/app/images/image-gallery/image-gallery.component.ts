import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { NavbarComponent } from '../../navbar/navbar.component';

import { ImageUploadComponent } from '../image-upload/image-upload.component';

@Component({
  selector: 'app-image-gallery',
  standalone: true,
  imports: [
    NavbarComponent,
    ImageUploadComponent
  ],
  templateUrl: './image-gallery.component.html',
  styleUrl: './image-gallery.component.css'
})
export class ImageGalleryComponent implements OnInit {
  newImg: File | null = null
  selectedGallery: string = ''
  images: any = []

  
  constructor(
    private router: Router,
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




}
