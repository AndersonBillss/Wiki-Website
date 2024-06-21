import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PageDefaultComponent } from './page-default/page-default.component';
import { PageComponent } from './page/page.component';
import { ImagesComponent } from './images/images.component';
import { ImageGalleryComponent } from './images/image-gallery/image-gallery.component';
import { ImageDetailComponent } from './images/image-detail/image-detail.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { IMAGE_CONFIG } from '@angular/common';

export const routes: Routes = [
    {path: "", redirectTo: "home", pathMatch: 'full'},
    {path: "home", component: HomeComponent},
    {path: "page/:title", component: PageComponent},
    {path: "page", component: PageDefaultComponent},
    {path: "images", component: ImagesComponent},
    {path: "images/concept", component: ImageGalleryComponent},
    {path: "images/assets", component: ImageGalleryComponent},
    {path: "images/concept/:id", component: ImageDetailComponent},
    {path: "images/assets/:id", component: ImageDetailComponent},
    {path: "**", component: PageNotFoundComponent}
];
