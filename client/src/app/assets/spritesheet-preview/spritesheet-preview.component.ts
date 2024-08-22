import { Component, ElementRef, ViewChild } from '@angular/core';
import { Input } from '@angular/core';
import { IconComponent } from '../../icon/icon.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spritesheet-preview',
  standalone: true,
  imports: [
    CommonModule,
    IconComponent
  ],
  templateUrl: './spritesheet-preview.component.html',
  styleUrl: './spritesheet-preview.component.css'
})
export class SpritesheetPreviewComponent{
  @Input() spritesheetSrc!: string
  @Input() frames!: number
  @Input() title!: string
  @Input() isEditing!: boolean
  @Input() deleteFunction!: Function
  @ViewChild('animationImage') animationImageRef!: ElementRef;

  public animationElement!: HTMLElement
  public animationWidth!: number

  public imgHeight = 120
  public frameIndex = 0

  public isAnimating: boolean = false
  private framesPerSecond = 12

  imageLoad(){
    this.animationElement = this.animationImageRef.nativeElement  
    this.animationWidth = this.animationElement.offsetWidth
  }

  animate(){
    this.nextFrame()
    if(this.isAnimating){
      setTimeout(() => {
        this.animate()
      }, 1000/this.framesPerSecond)
    }
  }

  startAnimating(){
    this.frameIndex = 0
    this.isAnimating = true;
    this.animate()
  }
  stopAnimating(){
    this.frameIndex = 0
    this.isAnimating = false;
  }

  nextFrame(){
    if(this.frameIndex < this.frames - 1){
      this.frameIndex++
    } else {
      this.frameIndex = 0
    }
  }


}

