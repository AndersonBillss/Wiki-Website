import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IconComponent } from '../../icon/icon.component';
import { Location } from '@angular/common';
import { AssetItemCreateComponent } from './asset-item-create/asset-item-create.component';

@Component({
  selector: 'app-asset-detail',
  standalone: true,
  imports: [
    CommonModule,
    IconComponent,
    AssetItemCreateComponent
  ],
  templateUrl: './asset-detail.component.html',
  styleUrl: './asset-detail.component.css'
})
export class AssetDetailComponent implements OnInit{
  assetName: string | null = ''
  public addingNewItem: boolean = true

  public assetObject: any = {
    assetName: '',
    tags: [],
    contents: [
      {
        name: "cool",
        type: "animation",
        spitesheetSrc: 12345,
        frames: 12,
      }
    ]
  }

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ){ }

  ngOnInit(): void {
    this.assetName = this.route.snapshot.paramMap.get("title")
  }

  goBack(){
    this.location.back();
  }

  public openAssetAdd(){
    this.addingNewItem = true
  }

  public addItem(item: any){
    console.log(item)
  }
}
