import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IconComponent } from '../../icon/icon.component';
import { Location } from '@angular/common';
import { AssetItemCreateComponent } from './asset-item-create/asset-item-create.component';
import { AssetService } from '../../services/asset.service';
import { SpritesheetPreviewComponent } from '../spritesheet-preview/spritesheet-preview.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-asset-detail',
  standalone: true,
  imports: [
    CommonModule,
    IconComponent,
    AssetItemCreateComponent,
    SpritesheetPreviewComponent
  ],
  templateUrl: './asset-detail.component.html',
  styleUrl: './asset-detail.component.css'
})
export class AssetDetailComponent implements OnInit{
  assetName: string | null = ''
  public addingNewItem: boolean = false
  public apiUrl: string = environment.apiUrl

  public assetObject: any = {
    title: '',
    tags: [],
    contents: []
  }

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private assetService: AssetService,
  ){ }

  ngOnInit(): void {
    this.assetName = this.route.snapshot.paramMap.get("title")
    if(this.assetName){
      this.assetService.getAssetFolderContents(this.assetName).subscribe(res => {
        this.assetObject = res
      })
    }
  }

  goBack(){
    this.location.back();
  }

  public openAssetAdd(){
    this.addingNewItem = true
  }

  public addItem(item: any){
    if(this.assetName){
      this.assetService.addAssetItem(this.assetName, item).subscribe(res => {
        console.log(res)
      })
    }
  }
}
