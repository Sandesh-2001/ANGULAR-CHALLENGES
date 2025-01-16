import { Component } from '@angular/core';
import { Ch01DynamicFormBuilderComponent } from '../ch01-dynamic-form-builder/ch01-dynamic-form-builder.component';
import { GenerateFormComponent } from '../generate-form/generate-form.component';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [Ch01DynamicFormBuilderComponent, GenerateFormComponent],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.css',
})
export class DynamicFormComponent {
  newControlObject: any;
  formDataArray: any[] = [
    {
      type: 'radio',
      placeholder: 'dfd',
      label: 'dfd',
      name: 'dfdf',
      options: ['data1', '2', '3'],
    },
  ];
  newControlData(newControlData: any) {
    console.log('new control data', newControlData);
    this.formDataArray = [...this.formDataArray, newControlData];
  }
}
