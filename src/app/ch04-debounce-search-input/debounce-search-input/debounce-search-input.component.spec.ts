import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebounceSearchInputComponent } from './debounce-search-input.component';

describe('DebounceSearchInputComponent', () => {
  let component: DebounceSearchInputComponent;
  let fixture: ComponentFixture<DebounceSearchInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebounceSearchInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DebounceSearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
