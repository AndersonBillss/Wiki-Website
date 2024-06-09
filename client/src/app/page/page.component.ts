import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PageContentsService } from '../services/page-contents.service';
import { encodePageContent, parsePageContent } from '../functions/pageContentFunctions';
import { CommonModule } from '@angular/common';
import { EditToolbarComponent } from '../edit-toolbar/edit-toolbar.component';
import { HeaderComponent } from './elements/header/header.component';
import { ParagraphComponent } from './elements/paragraph/paragraph.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';




@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  standalone: true,
  imports: [
    ParagraphComponent,
    HeaderComponent,

    EditToolbarComponent,
    NavbarComponent,

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
  title: string = ""

  snackbar: any = {success: true, msg: '', hidden: true}


  editMode: boolean = false

  constructor( 
    private pageContentService: PageContentsService,
    private route: ActivatedRoute
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
    this.pageContentService.savePageContents(this.title, this.pageContents).subscribe(data => {
      this.snackbar = data
      this.pageContentService.getPageContents(this.title).subscribe((data: any) => {
        if(data){
          this.pageContents = data.contents
          this.pageRegistered = data.registered
        }
      })
    })
    this.snackbar.hidden = false
    setTimeout(() => {
      this.snackbar.hidden = true
    },3000)

  }

  deletePage(){
    this.pageContentService.deletePage(this.title)
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



  ngOnInit(): void {
		this.title = this.route.snapshot.params["title"];
    this.pageContentService.getPageContents(this.title).subscribe((data: any) => {
      if(data){
        this.pageContents = data.contents
        this.pageRegistered = data.registered
      }
    })
  }


  test(){

  }


}
