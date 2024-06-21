import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import { NavbarComponent } from '../../navbar/navbar.component';

import { ImagesService } from '../../services/images.service';

import { ImageUploadComponent } from '../image-upload/image-upload.component';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../icon/icon.component';
import { SearchBoxComponent } from '../../navbar/search-box/search-box.component';
import { LoadingComponent } from '../../loading/loading.component';


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
    LoadingComponent
  ],
  templateUrl: './image-gallery.component.html',
  styleUrl: './image-gallery.component.css'
})
export class ImageGalleryComponent implements OnInit {
  newImg: File | null = null
  selectedGallery: string = ''
  images: any = []

  snackbar: any = {
    success: true,
    hidden: true,
    msg: ''
  }

  addingNewImage: boolean = false
  isLoading: boolean = true

  
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


    this.imagesService.getImages(this.selectedGallery).subscribe(data => {
      this.images = data.images
      this.isLoading = false
    })
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
    this.isLoading = true
    this.imagesService.uploadImage(this.selectedGallery, image).subscribe(data => {
      if(data.images){
        this.images = data.images
      }
      this.openSnackBar(data)
      this.isLoading = false
    })
  }


  openSnackBar(apiRes: any){
    this.snackbar = {
      success: apiRes.success,
      msg: apiRes.msg,
      hidden: false
    }
    setTimeout(() => {
      this.snackbar.hidden = true
    },3000)
  }


}
