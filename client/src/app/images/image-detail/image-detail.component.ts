import { Component, OnInit } from '@angular/core';
import { ImagesService } from '../../services/images.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';

import { LoadingComponent } from '../../loading/loading.component';
import { IconComponent } from '../../icon/icon.component';

@Component({
  selector: 'app-image-detail',
  standalone: true,
  imports: [
    CommonModule,

    IconComponent,
    LoadingComponent
  ],
  templateUrl: './image-detail.component.html',
  styleUrl: './image-detail.component.css'
})
export class ImageDetailComponent implements OnInit{
  pageName: string = ''
  imgId: string = ''
  isLoading: boolean = true
  img: any = {}
  snackbar: any = {
    success: true,
    hidden: true,
    msg: ''
  }

  constructor(
    private imagesService: ImagesService,
    private router: Router
  ){ }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.setRouteData()
    });
    this.setRouteData()

    this.imagesService.getImage(this.pageName, this.imgId).subscribe(data => {
      console.log(data)
      this.img = data.image
      this.isLoading = false
    })

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
}
