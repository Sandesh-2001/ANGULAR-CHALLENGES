import { JsonPipe, TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormErrorComponent } from '../form-error/form-error.component';
import { GenerateFormComponent } from "../generate-form/generate-form.component";

@Component({
  selector: 'app-ch01-dynamic-form-builder',
  standalone: true,
  imports: [ReactiveFormsModule, TitleCasePipe, JsonPipe, FormErrorComponent, GenerateFormComponent],
  templateUrl: './ch01-dynamic-form-builder.component.html',
  styleUrl: './ch01-dynamic-form-builder.component.css',
})
export class Ch01DynamicFormBuilderComponent implements OnInit {
  dynamicFormData: any[] = [
    {
      type: 'text',
      label: 'Name',
      name: 'name',
      placeholder: 'Enter your name',
      validators: { required: true, minlength: 3 },
    },
    {
      type: 'text',
      label: 'username',
      name: 'username',
      placeholder: 'Enter your name',
      validators: { required: true, minlength: 3 },
    },
    {
      type: 'text',
      label: 'first name',
      name: 'firstName',
      placeholder: 'Enter your name',
      validators: { required: true, minlength: 3 },
    },
    {
      type: 'text',
      label: 'last name',
      name: 'lastName',
      placeholder: 'Enter your name',
      validators: { required: true, minlength: 3 },
    },
    {
      type: 'email',
      label: 'Email',
      name: 'email',
      placeholder: 'Enter your email',
      validators: { required: true },
    },
    {
      type: 'number',
      label: 'Age',
      name: 'age',
      placeholder: 'Enter your age',
      validators: { required: true, min: 18 },
    },
    {
      type: 'select',
      label: 'Country',
      name: 'country',
      options: ['USA', 'Canada', 'UK'],
      validators: { required: true },
    },
    {
      type: 'select',
      label: 'Education',
      name: 'education',
      options: ['BCS', 'BCA', '12th', 'BE', 'B-tech'],
      validators: { required: true },
    },
    {
      type: 'checkbox',
      label: 'Accept Terms',
      name: 'terms',
      validators: { required: true },
    },
    {
      type: 'group',
      label: 'Address',
      name: 'address',
      fields: [
        {
          type: 'text',
          label: 'Street',
          name: 'street',
          placeholder: 'Enter your street',
          validators: { required: true },
        },
        {
          type: 'text',
          label: 'City',
          name: 'city',
          placeholder: 'Enter your city',
          validators: { required: true },
        },
        {
          type: 'number',
          label: 'Zip Code',
          name: 'zip',
          placeholder: 'Enter your zip code',
          validators: { required: true, minlength: 5 },
        },
      ],
    },
  ];
  dynamicForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.dynamicForm = new FormGroup({});
    this.dynamicForm = this.generateInitialForm(this.dynamicFormData);
    console.log('this', this);
  }

  generateInitialForm(dynamicFromDataFn: any) {
    let group: any = {};
    for (let i = 0; i < dynamicFromDataFn.length; i++) {
      let currentItem = dynamicFromDataFn[i];
      if (currentItem.type === 'group') {
        group[currentItem.name] = this.generateInitialForm(currentItem.fields);
      } else {
        let validators = this.getValidators(currentItem.validators);
        group[currentItem.name] = new FormControl('', validators);
      }
    }
    console.log('group', group);
    return new FormGroup(group);
  }

  getValidators(validatorConfig: any): any[] {
    let validatorsArray: any[] = [];
    if (validatorConfig?.required) validatorsArray.push(Validators.required);
    if (validatorConfig?.minlength)
      validatorsArray.push(Validators.minLength(validatorConfig.minlength));
    if (validatorConfig?.min)
      validatorsArray.push(Validators.min(validatorConfig.min));
    if (validatorConfig?.email) validatorsArray.push(Validators.email);
    return validatorsArray;
  }
  getFormControl(controlName: string) {
    return this.dynamicForm.get(controlName);
  }
  getFormGroup(groupName: string) {
    return this.dynamicForm.get(groupName) as FormGroup;
  }
}
