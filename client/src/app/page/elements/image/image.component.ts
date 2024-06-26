import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { ImageSelectComponent } from './image-select/image-select.component';
import { IconComponent } from '../../../icon/icon.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,

    ImageSelectComponent,
    IconComponent
  ],
  templateUrl: './image.component.html',
  styleUrl: './image.component.css'
})
export class ImageComponent {
  @Input() editMode!: boolean;
  @Input() data!: any;
  @Output() dataChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() enterPressed: EventEmitter<void> = new EventEmitter<void>();
  @Output() deleteElement: EventEmitter<void> = new EventEmitter<void>();

  selectComponentOpen: boolean = false
  selectedImageLocation: any = {
    _id: '',
    pageName: ''
  }

  imageUrl: string = ''

  cacheChanges(event: any) {
    const newValue = event.target.innerHTML;
    this.data.text = newValue
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

}

