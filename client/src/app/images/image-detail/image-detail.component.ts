import { Component, OnInit } from '@angular/core';
import { ImagesService } from '../../services/images.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';

import { LoadingComponent } from '../../loading/loading.component';
import { IconComponent } from '../../icon/icon.component';
import { Location } from '@angular/common';
import { SearchBoxComponent } from '../../navbar/search-box/search-box.component';

import { environment } from '../../../environments/environment';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-image-detail',
  standalone: true,
  imports: [
    CommonModule,

    IconComponent,
    LoadingComponent,
    SearchBoxComponent
  ],
  templateUrl: './image-detail.component.html',
  styleUrl: './image-detail.component.css'
})
export class ImageDetailComponent implements OnInit{
  editMode: boolean = false
  newTagName: string = ''
  tagErrMsg: string = ''

  imgId: string = ''
  isLoading: boolean = true

  apiUrl: string = environment.apiUrl

  tags: any[] = []

  img: any = {}
  snackbar: any = {
    success: true,
    hidden: true,
    msg: ''
  }
  diologue: any = {
    text: '',
    open: false,
    declineFunction: () => {
      this.diologue.open = false
    },
    confirmFunction: () => {}
  }

  constructor(
    private imagesService: ImagesService,
    private locationService: LocationService,
    private location: Location
  ){ }

  ngOnInit(): void {
    this.imgId = this.locationService.getCurrentRoute()[2] 
    this.imagesService.getImage(this.imgId).subscribe(data => {
      this.img = data.image
      this.tags = data.tags
      this.isLoading = false
    })

  }

  goBack(){
    this.location.back();
  }

  toggleEditMode(){
    if(this.editMode){
      this.editImage()
    } else {
      this.editMode = true
    }
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

  addTag(newTag: string){
    const tagName = newTag.toLowerCase().trim()
    if(!tagName){
      this.tagErrMsg = "Tag must have a name before you add it"
    } else
    if(this.img.tags.indexOf(tagName) !== -1){
      this.tagErrMsg = "Cannot have duplicate tag names"
    } else {
      this.img.tags.push(tagName)
      this.tagErrMsg = ""
      this.newTagName = ""
    }
  }
  removeTag(index: number){
    this.img.tags.splice(index,1)
  }

  editImage(){
    this.isLoading = true
    this.imagesService.updateImage(this.img).subscribe(data => {
      this.img = data.image
      this.isLoading = false
      this.openSnackBar(data)
      if(data.success){
        this.editMode = false
      }
    })
  }

  openDiologue(text: string, confirmFunction: any){
    this.diologue = {
      text: text,
      open: true,
      declineFunction: this.diologue.declineFunction,
      confirmFunction: () => {
        confirmFunction()
        this.diologue.open = false
      }
    }
  }

  deleteImage(){
    this.imagesService.deleteImage(this.imgId).subscribe(() => {
      this.location.back()
    })
  }
  
}
