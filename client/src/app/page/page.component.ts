import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { PageContentsService } from '../services/page-contents.service';
import { CommonModule } from '@angular/common';
import { EditToolbarComponent } from '../edit-toolbar/edit-toolbar.component';
import { HeaderComponent } from './elements/header/header.component';
import { ParagraphComponent } from './elements/paragraph/paragraph.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';


import { Router, NavigationEnd, Event } from '@angular/router';
import { filter } from 'rxjs/operators';

import { IconComponent } from '../icon/icon.component';
import { LoadingComponent } from '../loading/loading.component';




@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  standalone: true,
  imports: [
    ParagraphComponent,
    HeaderComponent,
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
export class PageComponent implements OnInit {
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


  title: string = ""

  snackbar: any = {success: true, msg: '', hidden: true}


  editMode: boolean = false

  constructor( 
    private pageContentService: PageContentsService,
    private route: ActivatedRoute,
    private router: Router
  ){ }


  toggleEditMode(){
    if(this.editMode){
      this.editMode = false
      this.savePageContents()
    } else {
      this.editMode = true
    }
  }

  savePageContents(){
    this.isLoading = true
    this.pageContentService.savePageContents(this.title, this.pageContents).subscribe((data: any) => {
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
    this.pageContentService.deletePage(this.title).subscribe((data: any) => {
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

    this.router.events.pipe(
      filter((event: Event) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.loadData()
    });

  }
  loadData(){
    this.isLoading = true

    this.title = this.route.snapshot.params["title"];
    this.pageContentService.getPageContents(this.title).subscribe((data: any) => {
      if(data){
        this.pageContents = data.contents
        this.pageRegistered = data.registered
        this.pageList = data.pageList
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



}
