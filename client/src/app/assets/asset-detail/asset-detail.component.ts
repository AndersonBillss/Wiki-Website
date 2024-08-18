import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-asset-detail',
  standalone: true,
  imports: [],
  templateUrl: './asset-detail.component.html',
  styleUrl: './asset-detail.component.css'
})
export class AssetDetailComponent implements OnInit{
  constructor(private route: ActivatedRoute){ }
  assetName: string | null = ''

  ngOnInit(): void {
    this.assetName = this.route.snapshot.paramMap.get("title")
  }
}
