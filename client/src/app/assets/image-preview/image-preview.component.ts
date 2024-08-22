import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { IconComponent } from "../../icon/icon.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-preview',
  standalone: true,
  imports: [
    IconComponent,
    CommonModule
  ],
  templateUrl: './image-preview.component.html',
  styleUrl: './image-preview.component.css'
})
export class ImagePreviewComponent {
  @Input() imageSrc!: string
  @Input() title!: string
  @Input() isEditing!: boolean
  @Input() deleteFunction!: Function
  
  @ViewChild('image') imageRef!: ElementRef;

  public imageWidth!: number

  imageLoad(){
    const imageElement = this.imageRef.nativeElement
    this.imageWidth = imageElement.offsetWidth
  }
}
