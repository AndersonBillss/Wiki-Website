import { Component, OnInit } from '@angular/core';
import { ImagesService } from '../../services/images.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';

import { LoadingComponent } from '../../loading/loading.component';
import { IconComponent } from '../../icon/icon.component';
import { Location } from '@angular/common';
import { SearchBoxComponent } from '../../navbar/search-box/search-box.component';

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

  pageName: string = ''
  imgId: string = ''
  isLoading: boolean = true

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
    private router: Router,
    private location: Location
  ){ }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.setRouteData()
    });
    this.setRouteData()

    this.imagesService.getImage(this.pageName, this.imgId).subscribe(data => {
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


  setRouteData(){
    const routeName = '/images'
    let route = this.router.url;
    const routeEndpoint = route.slice(routeName.length, route.length).trim()


    if(routeEndpoint !== ''){
      const routeEndpointWithouSlash = routeEndpoint.slice(1,routeEndpoint.length)
      const slashIndex = routeEndpointWithouSlash.indexOf('/')
      if(slashIndex !== -1){
        this.pageName = routeEndpointWithouSlash.slice(0,slashIndex)
        this.imgId = routeEndpointWithouSlash.slice(slashIndex+1,routeEndpointWithouSlash.length)
      }
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
    this.imagesService.updateImage(this.pageName, this.img).subscribe(data => {
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
    this.imagesService.deleteImage(this.pageName, this.imgId).subscribe(() => {
      this.location.back()
    })
  }
  
}
