import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ch02ContentProjectionParentComponent } from './ch02-content-projection-parent.component';

describe('Ch02ContentProjectionParentComponent', () => {
  let component: Ch02ContentProjectionParentComponent;
  let fixture: ComponentFixture<Ch02ContentProjectionParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ch02ContentProjectionParentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Ch02ContentProjectionParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
