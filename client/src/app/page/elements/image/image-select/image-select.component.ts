import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../../navbar/navbar.component';
import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ImagesService } from '../../../../services/images.service';

import { ImageUploadComponent } from '../../../../images/image-upload/image-upload.component';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../../icon/icon.component';
import { SearchBoxComponent } from '../../../../navbar/search-box/search-box.component';
import { LoadingComponent } from '../../../../loading/loading.component';
import getTags from '../../../../utils/getTags';
import filterImages from '../../../../utils/filterImages';

@Component({
  selector: 'app-image-select',
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
  templateUrl: './image-select.component.html',
  styleUrl: './image-select.component.css'
})
export class ImageSelectComponent {
  @Input() isVisible!: boolean;
  @Output() isVisibleChange = new EventEmitter<boolean>();

  @Input() selectFuntion!: any

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
    private imagesService: ImagesService
  ) {}


  openImageUpload(){
    this.addingNewImage = true
  }

  selectGallery(pageName: string){
    this.selectedGallery = pageName
    this.imagesService.getImages(this.selectedGallery).subscribe(data => {
      if(data.images){
        this.images = data.images
        this.filteredImages = data.images
        this.tags = getTags(data.images)
      }
      this.isLoading = false
    })
  }


  close(){
    this.isVisible = false
    this.isVisibleChange.emit(this.isVisible)
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
    console.log('filter tag')
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
  }


  selectImage(id: string){
    this.selectFuntion({_id: id, pageName: this.selectedGallery})
    this.isVisible = false
    this.isVisibleChange.emit(this.isVisible)
  }
}
