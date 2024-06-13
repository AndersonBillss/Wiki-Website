import { Component, Input, OnChanges, OnInit, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.css'
})
export class IconComponent implements OnInit, OnChanges {
  @Input() icon!: string;
  color: string = 'rgb(0,0,0)';
  private observer: MutationObserver;


  constructor(private elRef: ElementRef) {
    this.observer = new MutationObserver((mutations: MutationRecord[]) => {
      mutations.forEach(() => this.updateColor());
      }
    );
  }



  ngOnInit(): void {
    this.observer.observe(this.elRef.nativeElement, {
      attributes: true,
      attributeFilter: ['style', 'class']
    });
  }

  ngOnChanges(): void {
    this.updateColor();
  }

  



  updateColor() {
    const computedStyle = getComputedStyle(this.elRef.nativeElement);
    this.color = computedStyle.getPropertyValue('color');
  }
}