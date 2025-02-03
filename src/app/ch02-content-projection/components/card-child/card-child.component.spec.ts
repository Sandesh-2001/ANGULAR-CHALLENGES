import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardChildComponent } from './card-child.component';

describe('CardChildComponent', () => {
  let component: CardChildComponent;
  let fixture: ComponentFixture<CardChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardChildComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
