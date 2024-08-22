import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IconComponent } from "../../icon/icon.component";
import { SearchBoxComponent } from '../../navbar/search-box/search-box.component';
import { AssetService } from '../../services/asset.service';
import { AssetCreateComponent } from '../asset-create/asset-create.component';
import { LoadingComponent } from '../../loading/loading.component';
import { RouterModule } from '@angular/router';
import filterItems from '../../utils/filterItems';

import { getCachedAssetTags, getCachedSearchTerm, setCachedAssetTags, setCachedSearchTerm } from "../../utils/cachedAssetSearch"

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
  public tags: string[] = []

  public filterString: string = ""
  public filterTags: string[] = []

  public filteredFolders: any[] = []

  public addingNewAsset: boolean = false


  constructor(
    private AssetService: AssetService,
  ){ }

  ngOnInit(): void {
    this.isLoading = true
    this.AssetService.getFolders().subscribe(res => {
      this.folders = res.data
      this.isLoading = false
      this.getAllTags()
      this.search()
    })
    this.filterString = getCachedSearchTerm()
    this.filterTags = getCachedAssetTags()
  }

  getAllTags(){
    let newTags: string[] = []
    this.folders.forEach(folder => {
      newTags = newTags.concat(folder.tags)
    })
    newTags = [...new Set(newTags)]
    newTags.sort()
    this.tags = newTags
  }

  public addFolder(info: any){
    const nameFound = this.folders.find(f => f.title === info.title)
    if(!nameFound && info.title.trim() !== ''){
      this.isLoading = true
      this.AssetService.addFolder(info.title, info.tags).subscribe(res => {
        this.folders = res.data
        this.isLoading = false

        this.getAllTags()
        this.search()
      })
    }
  }

  public openAssetAdd(){
    this.addingNewAsset = true
  }

  addTagFilter(tagName: string){
    tagName = tagName.trim().toLowerCase()
    let isValidFilter = true
    if(tagName){
      this.filterTags.forEach(filterTag => {
        if(filterTag === tagName){
          isValidFilter = false
        }
      })
      if(isValidFilter){
        this.filterTags.push(tagName)
      }
    }
    this.search()
  }

  removeFilterTag(index: number){
    this.filterTags.splice(index,1)
    this.search()
  }

  search(){
    this.filteredFolders = filterItems(this.folders,this.filterString,this.filterTags)
    setCachedAssetTags(this.filterTags)
    setCachedSearchTerm(this.filterString)
  }

}

