import { JsonPipe, TitleCasePipe } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormErrorComponent } from '../form-error/form-error.component';
import { GenerateFormComponent } from '../generate-form/generate-form.component';

@Component({
  selector: 'app-ch01-dynamic-form-builder',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TitleCasePipe,
    JsonPipe,
    FormErrorComponent,
    GenerateFormComponent,
  ],
  templateUrl: './ch01-dynamic-form-builder.component.html',
  styleUrl: './ch01-dynamic-form-builder.component.css',
})
export class Ch01DynamicFormBuilderComponent implements OnInit, OnChanges {
  @Input('formDataArray') dynamicFormData: any[] = [];
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
  ngDoCheck() {}
  ngOnChanges(changes: any): void {
    console.log('changes ', changes);
    this.dynamicForm = this.generateInitialForm(
      changes.dynamicFormData.currentValue
    );
    this.dynamicFormData = changes.dynamicFormData.currentValue;
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

  onCustomFormSubmit() {
    console.log('custom form values', this.dynamicForm.value);
  }
}
