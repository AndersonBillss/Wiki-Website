import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import { ImageSelectComponent } from './image-select/image-select.component';
import { IconComponent } from '../../../icon/icon.component';
import { RouterModule } from '@angular/router';
/* import { CachedImagesService } from '../../../services/cachedImages.service';
 */import { LoadingComponent } from '../../../loading/loading.component';
import { parsePageContent, encodePageContent } from '../../../utils/pageContentFunctions';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,

    ImageSelectComponent,
    IconComponent,
    LoadingComponent
  ],
  templateUrl: './image.component.html',
  styleUrl: './image.component.css'
})
export class ImageComponent implements OnInit{
  @Input() editMode!: boolean;
  @Input() data!: any;
  @Output() dataChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() enterPressed: EventEmitter<void> = new EventEmitter<void>();
  @Output() deleteElement: EventEmitter<void> = new EventEmitter<void>();

  selectComponentOpen: boolean = false
  imageId: string = ''
  pageName: string = ''
  isLoading: boolean = true

  innerHtml: string | undefined = ''
  apiUrl: string = environment.apiUrl

  ngOnInit(): void {
    this.data = {
      type: "Image",
      text: this.data.text,
      imageId: this.data?.imageId || '',
    }
    this.imageId = this.data?.imageId || ''

    this.isLoading = false

    this.innerHtml = parsePageContent(this.data.text)
  }


  cacheChanges(event: any) {
    const newValue = event.target.innerHTML;
    this.data.text = encodePageContent(newValue)
    this.dataChange.emit(this.data);
  }

  keyDownHandler(event: any){
    //handle enter press
    if(event.key === "Enter"){
      event.preventDefault();
      this.enterPressed.emit()
    }
    //delete element
    if(event.key === "Backspace" || event.key === "Delete"){
      if(event.target.innerHTML.length === 0){
        this.deleteElement.emit()
      }
    }

  }

  openImageSelect(){
    this.selectComponentOpen = true
  }

  async selectImage(id: string){
    this.data.imageId = id
    this.dataChange.emit(this.data);
  }

}

