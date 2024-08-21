import { Component, ElementRef, ViewChild } from '@angular/core';
import { Input } from '@angular/core';
import { IconComponent } from '../../icon/icon.component';

@Component({
  selector: 'app-spritesheet-preview',
  standalone: true,
  imports: [
    IconComponent
  ],
  templateUrl: './spritesheet-preview.component.html',
  styleUrl: './spritesheet-preview.component.css'
})
export class SpritesheetPreviewComponent{
  @Input() spritesheetSrc!: string
  @Input() frames!: number
  @Input() title!: string
  @ViewChild('animationImage') animationImageRef!: ElementRef;

  public animationElement!: HTMLElement
  public animationHeight!: number
  public animationWidth!: number

  public imgHeight = 0
  public frameIndex = 0

  public isAnimating: boolean = false
  private framesPerSecond = 12

  imageLoad(){
    this.animationElement = this.animationImageRef.nativeElement  
    this.animationHeight = this.animationElement.offsetHeight
    this.animationWidth = this.animationElement.offsetWidth
    this.imgHeight = this.animationHeight / this.frames
    this.animate()
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

