import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetGalleryComponent } from './asset-gallery.component';

describe('AssetGalleryComponent', () => {
  let component: AssetGalleryComponent;
  let fixture: ComponentFixture<AssetGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetGalleryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssetGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
