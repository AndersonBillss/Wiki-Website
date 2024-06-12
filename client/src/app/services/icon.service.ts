import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Injectable({
  providedIn: 'root'
})
export class IconService {
  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
  }

  registerIcons(): void {
    console.log('register icons')

    this.iconRegistry.addSvgIcon(
      'delete-icon',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/delete.svg')
    );
    this.iconRegistry.addSvgIcon(
      'edit-icon',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/edit.svg')
    );
    this.iconRegistry.addSvgIcon(
      'home-icon',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/home.svg')
    );
    this.iconRegistry.addSvgIcon(
      'save-icon',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/save.svg')
    );

  }
}
