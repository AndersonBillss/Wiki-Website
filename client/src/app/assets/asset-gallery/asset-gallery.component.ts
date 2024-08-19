import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IconComponent } from "../../icon/icon.component";
import { SearchBoxComponent } from '../../navbar/search-box/search-box.component';
import { AssetService } from '../../services/asset.service';
import { AssetCreateComponent } from '../asset-create/asset-create.component';
import { LoadingComponent } from '../../loading/loading.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-asset-gallery',
  standalone: true,
  imports: [
    CommonModule, 
    IconComponent, 
    SearchBoxComponent, 
    AssetCreateComponent, 
    LoadingComponent,
    RouterModule
  ],
  templateUrl: './asset-gallery.component.html',
  styleUrl: './asset-gallery.component.css'
})
export class AssetGalleryComponent implements OnInit{
  public isLoading: boolean = true
  public folders: any[] = []

  public addingNewAsset: boolean = false


  constructor(
    private AssetService: AssetService,
  ){ }

  ngOnInit(): void {
    this.isLoading = true
    this.AssetService.getFolders().subscribe(res => {
      this.folders = res.data
      this.isLoading = false
    })
  }

  public addFolder(info: any){
    const nameFound = this.folders.find(f => f.title === info.title)
    if(!nameFound && info.title.trim() !== ''){
      this.isLoading = true
      this.AssetService.addFolder(info.title, info.tags).subscribe(res => {
        this.folders = res.data
        this.isLoading = false
      })
    }
  }

  public openAssetAdd(){
    this.addingNewAsset = true
  }

}
