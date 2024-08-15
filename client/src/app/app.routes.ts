import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PageDefaultComponent } from './page/elements/page-default/page-default.component';
import { PageSelectComponent } from './page/page-select/page-select.component';
import { PageComponent } from './page/page.component';
import { ImagesComponent } from './images/images.component';
import { ImageGalleryComponent } from './images/image-gallery/image-gallery.component';
import { ImageDetailComponent } from './images/image-detail/image-detail.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AssetGalleryComponent } from './assets/asset-gallery/asset-gallery.component';

export const routes: Routes = [
    {path: "", redirectTo: "home", pathMatch: 'full'},
    {path: "home", component: HomeComponent},
    {path: "login", component: LoginComponent},
    {path: "signUp", component: SignUpComponent},

    {path: "page", component: PageSelectComponent},
    {path: "page/lore", component: PageDefaultComponent},
    {path: "page/gameplay", component: PageDefaultComponent},
    {path: "page/lore/:title", component: PageComponent},
    {path: "page/gameplay/:title", component: PageComponent},

    {path: "images", component: ImageGalleryComponent},
/*     {path: "images/concept", component: ImageGalleryComponent},
    {path: "images/assets", component: ImageGalleryComponent}, */
    {path: "images/concept/:id", component: ImageDetailComponent},
    {path: "images/assets/:id", component: ImageDetailComponent},
    {path: "assets", component: AssetGalleryComponent},
    {path: "**", component: PageNotFoundComponent}
];
