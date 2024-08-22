import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IconComponent } from '../../icon/icon.component';
import { Location } from '@angular/common';
import { AssetItemCreateComponent } from './asset-item-create/asset-item-create.component';
import { AssetService } from '../../services/asset.service';
import { SpritesheetPreviewComponent } from '../spritesheet-preview/spritesheet-preview.component';
import { environment } from '../../../environments/environment';
import { ImagePreviewComponent } from '../image-preview/image-preview.component';
import { LoadingComponent } from "../../loading/loading.component";

@Component({
  selector: 'app-asset-detail',
  standalone: true,
  imports: [
    CommonModule,
    IconComponent,
    AssetItemCreateComponent,
    SpritesheetPreviewComponent,
    ImagePreviewComponent,
    LoadingComponent
],
  templateUrl: './asset-detail.component.html',
  styleUrl: './asset-detail.component.css'
})
export class AssetDetailComponent implements OnInit{
  assetName: string | null = ''
  diologue: any = {
    text: '',
    open: false,
    showConfirm: true,
    declineFunction: () => {
      this.diologue.open = false
    },
    confirmFunction: () => {}
  }
  public addingNewItem: boolean = false
  public apiUrl: string = environment.apiUrl
  public isEditing: boolean = false
  public loading: boolean = true

  public assetObject: any = {
    title: '',
    tags: [],
    contents: []
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private assetService: AssetService,
  ){ }

  ngOnInit(): void {
    this.assetName = this.route.snapshot.paramMap.get("title")
    if(this.assetName){
      this.assetService.getAssetFolderContents(this.assetName).subscribe(res => {
        this.assetObject = res
        this.loading = false
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
      this.loading = true
      this.assetService.addAssetItem(this.assetName, item).subscribe(res => {
        this.assetObject = res
        this.loading = false
      })
    }
  }

  toggleEdit(){
    this.isEditing = !this.isEditing
  }

  openDeleteItemDiologue(index: number){
    const targetId = this.assetObject.contents[index]._id
    const targetTitle = this.assetObject.contents[index].title
    this.setDiologue(`Are you sure you want to delete the item "${targetTitle}"`, this.deleteItem.bind(this, targetId))
  }
  openDeleteFolderDiologue(){
    if(this.assetObject.contents.length > 0){
      this.setDiologue("You can't delete this folder unless it is empty", () => {}, false)
    } else {
      this.setDiologue("Are you sure you want to delete this folder", this.deleteFolder.bind(this), true)
    }
  }
  deleteFolder(){
    if(this.assetName){
      this.assetService.deleteAssetFolder(this.assetName).subscribe(res => {
        this.router.navigate(['/assets'])
      })
    }
  }

  deleteItem(id: string){
    this.loading = true
    if(this.assetName){
      this.assetService.deleteAssetItem(this.assetName, id).subscribe(data => {
        this.assetObject = data
        this.loading = false
      })
    }
  }

  setDiologue(text: string, confirmFunction: any, showConfirm?: boolean){
    this.diologue = {
      text: text,
      open: true,
      showConfirm: showConfirm===false?false:true,
      declineFunction: this.diologue.declineFunction,
      confirmFunction: () => {
        confirmFunction()
        this.diologue.open = false
      }
    }
  }
}
