import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IconComponent } from "../../icon/icon.component";
import { SearchBoxComponent } from '../../navbar/search-box/search-box.component';

@Component({
  selector: 'app-asset-gallery',
  standalone: true,
  imports: [CommonModule, IconComponent, SearchBoxComponent],
  templateUrl: './asset-gallery.component.html',
  styleUrl: './asset-gallery.component.css'
})
export class AssetGalleryComponent{
  public newFolderName: string = ''
  public folders: any[] = [
    {title: "Folder", id: '123'}
  ]

  public addFolder(){
    const nameFound = this.folders.find(f => f.title === this.newFolderName)
    if(!nameFound && this.newFolderName.trim() !== ''){
      this.folders.push({title: this.newFolderName, id: undefined})
      this.newFolderName = ''
    }
  }

}
