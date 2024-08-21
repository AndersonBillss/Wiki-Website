import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpritesheetPreviewComponent } from './spritesheet-preview.component';

describe('SpritesheetPreviewComponent', () => {
  let component: SpritesheetPreviewComponent;
  let fixture: ComponentFixture<SpritesheetPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpritesheetPreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpritesheetPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
