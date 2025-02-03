import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentDropdownComponent } from './parent-dropdown.component';

describe('ParentDropdownComponent', () => {
  let component: ParentDropdownComponent;
  let fixture: ComponentFixture<ParentDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParentDropdownComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParentDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
