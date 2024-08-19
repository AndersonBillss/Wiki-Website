import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetItemCreateComponent } from './asset-item-create.component';

describe('AssetItemCreateComponent', () => {
  let component: AssetItemCreateComponent;
  let fixture: ComponentFixture<AssetItemCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetItemCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssetItemCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
