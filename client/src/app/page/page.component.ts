import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { PageContentsService } from '../services/page-contents.service';
import { CommonModule } from '@angular/common';
import { EditToolbarComponent } from '../edit-toolbar/edit-toolbar.component';
import { HeaderComponent } from './elements/header/header.component';
import { ParagraphComponent } from './elements/paragraph/paragraph.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';


import { Router } from '@angular/router';

import { IconComponent } from '../icon/icon.component';
import { LoadingComponent } from '../loading/loading.component';
import { ImageComponent } from './elements/image/image.component';
import { CachedImagesService } from '../services/cachedImages.service';
import { LocationService } from '../services/location.service';




@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  standalone: true,
  imports: [
    ParagraphComponent,
    HeaderComponent,
    ImageComponent,
    IconComponent,

    EditToolbarComponent,
    NavbarComponent,
    RouterModule,
    LoadingComponent,

    HttpClientModule,

    CommonModule
  ],
  styleUrl: './page.component.css'
})
export class PageComponent implements OnInit, OnDestroy {
  @ViewChild('elementsContainer') elementsContainer!: ElementRef;

  isLoading: boolean = true
  pageContents: any[] = []
  pageRegistered: boolean | null = null

  pageList: string[] | null = null

  diologue: any = {
    text: '',
    open: false,
    declineFunction: () => {
      this.diologue.open = false
    },
    confirmFunction: () => {}
  }


  section: string = ""
  title: string = ""

  snackbar: any = {success: true, msg: '', hidden: true}
  currentEditor: string = ''

  editMode: boolean = false

  
  constructor( 
    private pageContentService: PageContentsService,
    private route: ActivatedRoute,
    private router: Router,
    private cachedImagesService: CachedImagesService,
    private locationService: LocationService
  ){ }


  toggleEditMode(){
    if(this.editMode){
      this.editMode = false
      this.savePageContents()
    } else {
      this.pageContentService.startEditing(this.section, this.title).subscribe((data: any) => {
        this.editMode = data.success
        this.openSnackBar(data)

      }, (error: any) => {
        this.editMode = error.error.success
        this.openSnackBar(error.error)
      })
    }
  }

  savePageContents(){
    this.isLoading = true
    this.pageContentService.savePageContents(this.section, this.title, this.pageContents).subscribe((data: any) => {
      this.pageContents = data.updatedContents.data.contents
      this.pageRegistered = true

      this.pageList = data.updatedContents.data.pageList
      this.isLoading = false
      this.openSnackBar(data)
    })

  }

  deletePage(){
    this.isLoading = true
    this.editMode = false
    this.pageContentService.deletePage(this.section, this.title).subscribe((data: any) => {
      if(data.success){
        this.pageRegistered = false
      }
      this.pageList = data.pageList
      this.isLoading = false
      this.openSnackBar(data)
    })
  }

  //create new element
  handleEnterPress(index: number){
    const newIndex = index+1
    this.pageContents.splice(newIndex,0,{
      type: "Paragraph",
      text: ""
    })

    setTimeout(() => {
      const parent = this.elementsContainer.nativeElement;
      const targetElement = parent.children[newIndex];
      const contentEditableElement = targetElement.querySelector('[contenteditable="true"]');
      if (contentEditableElement instanceof HTMLElement) {
        contentEditableElement.focus();
      }
    });
  }
  
  deleteElement(index: number){
    const parent = this.elementsContainer.nativeElement;

    if(this.pageContents.length > 1){
      //remove the element from the DOM before removing it from the array
      const target = parent.children[index]
      parent.removeChild(target)
      this.pageContents.splice(index,1)

    }
    setTimeout(() => {
      let targetElement
      if(parent.children[index-1]){
        targetElement = parent.children[index-1]
      } else {
        targetElement = parent.children[index]
      }
      const contentEditableElement = targetElement.querySelector('[contenteditable="true"]');

      const range = document.createRange();
      const selection = window.getSelection();

      if (contentEditableElement instanceof HTMLElement && selection) {
        contentEditableElement.focus();

        //set range to the end of the contentEditableElement
        range.setStart(contentEditableElement, contentEditableElement.textContent?.length?1:0)
        range.collapse(true);

        selection.removeAllRanges();
        selection.addRange(range);
      }
    })
  }


  setDiologue(text: string, confirmFunction: any){
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

  ngOnInit(): void {
    this.loadData()
  }
  ngOnDestroy(): void {
    this.savePageContents()
  }
  loadData(){
      this.title = this.locationService.getCurrentRoute()[2]
      this.section = this.locationService.getCurrentRoute()[1]
    this.isLoading = true
    this.pageContentService.getPageContents(this.section, this.title).subscribe((data: any) => {
      if(data){
        this.pageContents = data.contents
        this.pageRegistered = data.registered
        this.pageList = data.pageList
        this.currentEditor = data.currentEditor
        this.cachedImagesService.setCachedImages(data.images)
        this.isLoading = false
      }
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


  navigateToPage(pageName: string){
    this.router.navigate([`/page/${this.section}/${pageName}`]).then(() => {
      this.loadData()
    })
  }

}

