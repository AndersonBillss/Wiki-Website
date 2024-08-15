import { Component } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent {
  @ViewChild('loadingElement') loadingElement!: ElementRef;
  
  radius: number = 50;
  color: string = this.getCustomProperty('--primary-color');
  backgroundColor: string = this.getCustomProperty('--background-color')

  startFill: number = 0;
  endFill: number = 0;

  startErase: number = 0
  endErase: number = 0

  fillDirection: string = 'fill'

  
  constructor() { }

  ngAfterViewInit() {
    this.animate();
  }

  drawProgressSpinner(ctx: CanvasRenderingContext2D, centerX: number, centerY: number) {
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, this.radius, this.startFill * Math.PI, this.endFill * Math.PI, false);
    ctx.closePath();  
    ctx.fillStyle = this.color;
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, this.radius+1, this.startErase * Math.PI, this.endErase * Math.PI, false);
    ctx.closePath();  
    ctx.fillStyle = this.backgroundColor;
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, this.radius * 0.75, 0, 2 * Math.PI, false);
    ctx.closePath();  
    ctx.fillStyle = this.backgroundColor;
    ctx.fill();
  }

  updateProgressSpinner() {

    if(this.fillDirection === 'fill'){
      this.endFill = this.endFill + 0.03;
      this.startFill = this.startFill + 0.015
    }
    if(this.fillDirection === 'unfill'){
      this.endFill = this.endFill + 0.015;
      this.startFill = this.startFill + 0.03
    }


    if(this.startFill > this.endFill){
      const fillStart = this.startFill
      this.startFill = this.endFill
      this.endFill = fillStart
      this.fillDirection = 'fill'
    }
    if(this.endFill > this.startFill + 2 - .03){
      this.fillDirection = 'unfill'
    }


    this.startErase = this.endFill 
    this.endErase = this.startFill
  }

  animate() {
    const loadingCanvas: HTMLCanvasElement = this.loadingElement.nativeElement;
    const centerX = loadingCanvas.width / 2;
    const centerY = loadingCanvas.height / 2;
    const ctx = loadingCanvas.getContext("2d")!;

    const animateFrame = () => {
      requestAnimationFrame(animateFrame);
      this.updateProgressSpinner();
      this.drawProgressSpinner(ctx, centerX, centerY);
    }

    animateFrame();
  }


  getCustomProperty(propertyName: string): string {
    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);
    const propertyValue = computedStyle.getPropertyValue(propertyName).trim();
    return propertyValue
  }
}
