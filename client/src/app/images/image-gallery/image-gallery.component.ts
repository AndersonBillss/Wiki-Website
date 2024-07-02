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
import getTags from '../../utils/getTags';
import filterImages from '../../utils/filterImages';

import { getCachedImageTags, getCachedSearchTerm, setCachedImageTags, setCachedSearchTerm } from '../../utils/cachedImageSearch';


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
  images: any[] = []
  tags: any[] = []

  filterTags: any[] = []
  filterString: string = ""
  filteredImages: any[] = []

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

    this.filterTags = getCachedImageTags(this.selectedGallery)
    this.filterString = getCachedSearchTerm(this.selectedGallery)


    this.imagesService.getImages(this.selectedGallery).subscribe(data => {
      if(data.images){
        this.images = data.images
        this.filteredImages = filterImages(this.images,this.filterString,this.filterTags)
        this.tags = getTags(data.images)
      }
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
    this.imagesService.uploadImage(this.selectedGallery, image).subscribe(
      data => {
        this.openSnackBar(data)
        this.isLoading = false

        if(data.images){
          this.images = data.images
          this.tags = getTags(data.images)
          this.searchImages()
        }
      },
      error => {
        this.openSnackBar(error.error);
        this.isLoading = false;
      }
    )

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


  addTagFilter(tagName: string){
    tagName = tagName.trim().toLowerCase()
    let isValidFilter = true
    if(tagName){
      this.filterTags.forEach(filterTag => {
        if(filterTag === tagName){
          isValidFilter = false
        }
      })
      if(isValidFilter){
        this.filterTags.push(tagName)
      }
    }
    this.searchImages()
  }

  removeFilterTag(index: number){
    this.filterTags.splice(index,1)
    this.searchImages()
  }

  searchImages(string?: string){
    this.filteredImages = filterImages(this.images,this.filterString,this.filterTags)
    setCachedImageTags(this.selectedGallery,this.filterTags)
    setCachedSearchTerm(this.selectedGallery,this.filterString)
  }

}
