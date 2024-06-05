import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageDefaultComponent } from './page-default/page-default.component';
import { PageComponent } from './page/page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
    {path: "", redirectTo: "home", pathMatch: 'full'},
    {path: "home", component: HomeComponent},
    {path: "page/:title", component: PageComponent},
    {path: "page", component: PageDefaultComponent},
    {path: "**", component: PageNotFoundComponent}
];
