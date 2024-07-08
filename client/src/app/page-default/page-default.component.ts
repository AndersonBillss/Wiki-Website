import { Component, OnInit } from '@angular/core';
import { PageContentsService } from '../services/page-contents.service';

import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from '../loading/loading.component';

import { Router } from '@angular/router';

@Component({
  selector: 'app-page-default',
  standalone: true,
  imports: [
    NavbarComponent,
    CommonModule,
    RouterModule,
    LoadingComponent
  ],
  templateUrl: './page-default.component.html',
  styleUrl: './page-default.component.css'
})
export class PageDefaultComponent implements OnInit{
  constructor(
    private pageContentService: PageContentsService,
    private router: Router
  ){}
  pages: string[] | null = null
  isLoading: boolean = true;

  ngOnInit(): void {
    this.pageContentService.getPageList().subscribe(data => {
      this.pages = data
      this.isLoading = false
    })
  }

  navigateToPage(pageName: any){
    this.router.navigate([`/page/${pageName}`])
  }
}
