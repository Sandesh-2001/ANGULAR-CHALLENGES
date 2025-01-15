import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ch01DynamicFormBuilderComponent } from './ch01-dynamic-form-builder.component';

describe('Ch01DynamicFormBuilderComponent', () => {
  let component: Ch01DynamicFormBuilderComponent;
  let fixture: ComponentFixture<Ch01DynamicFormBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ch01DynamicFormBuilderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Ch01DynamicFormBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
