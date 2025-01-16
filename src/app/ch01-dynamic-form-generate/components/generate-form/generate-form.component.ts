import {
  Component,
  OnInit,
  ViewChild,
  EventEmitter,
  Output,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GeneralModalComponent } from '../../../shared/components/general-modal/general-modal.component';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-generate-form',
  standalone: true,
  imports: [ReactiveFormsModule, GeneralModalComponent, FormsModule, JsonPipe],
  templateUrl: './generate-form.component.html',
  styleUrl: './generate-form.component.css',
})
export class GenerateFormComponent implements OnInit {
  @Output() newControl: EventEmitter<any> = new EventEmitter();
  typeOfField: any[] = [
    'number',
    'text',
    'email',
    'select',
    'radio',
    'checkbox',
    'group',
  ];
  typeOfFieldsInsideNested: any[] = ['number', 'text', 'email'];
  isShowGeneralModal: boolean = false;
  isFormCreated: boolean = true;
  formName: string = 'login';
  generateForm: FormGroup = new FormGroup({});
  typeGroupArray: FormArray = new FormArray<any>([]);
  nestedFormArray: FormArray = new FormArray<any>([]);
  optionsArray: FormArray = new FormArray<any>([]);
  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.generateForm = this.generateCustomForm();
    console.log('generate form group', this.generateCustomForm());
    this.generateForm.get('type')?.valueChanges.subscribe((data) => {
      console.log('type change', data);
      if (data == 'select' || data === 'radio') {
        this.createNewGroup();
        this.createNewGroup();
        this.createNewGroup();
        this.createNewGroup();
        console.log('updated form', this.generateForm);
      } else if (data === 'group') {
        this.createNestedFormGroup();
      }
    });
    this.generateForm.get('name')?.valueChanges.subscribe((data) => {
      console.log('name value ', data);
      this.generateForm.updateValueAndValidity();
      this.generateForm.get('placeholder')?.setValue(`Enter ${data}`);
      this.generateForm.get('label')?.setValue(`${data}`);
    });
  }
  createNewForm() {
    this.isShowGeneralModal = true;
  }
  generalModalShowHide(value: boolean) {
    console.log('value ');
    this.isFormCreated = value && this.formName.trim().length !== 0;
    this.isShowGeneralModal = false;
  }

  formNameChange() {
    console.log('form name change', this.formName);
    // console.log('cancel modal', this.GeneralModalComponent);
  }
  generateCustomForm() {
    // this.createNewGroup();
    // this.createNestedFormGroup();
    let group: any = {
      type: new FormControl('', [Validators.required, Validators.minLength(3)]),
      placeholder: new FormControl('', Validators.required),
      label: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      options: this.optionsArray,
      fields: this.nestedFormArray,
    };
    return this.fb.group(group);
  }

  addControl(controlName?: string, validators?: any[]) {
    let updatedOption = this.generateForm.value.options;
    updatedOption = updatedOption.map((data: any) => data['option']);
    console.log('data', updatedOption);
    this.newControl.emit({
      ...this.generateForm.value,
      options: updatedOption,
    });
    this.generateForm.reset();
    this.nestedFormArray = new FormArray<any>([]);
    while (this.optionsArray.length !== 0) {
      this.optionsArray.removeAt(0);
    }
  }

  createNewControl() {
    this.optionsArray.push(new FormControl('option1'));
  }
  createNewGroup(validators: any = ['required']): void {
    while (this.optionsArray.length !== 0) {
      this.optionsArray.removeAt(0);
    }
    [1, 2, 3, 4].forEach((data) => {
      let optionGroup = this.fb.group({ option: new FormControl('') });
      this.optionsArray.push(optionGroup);
    });
    console.log('options array', this.optionsArray);
    // return optionGroup;
  }

  createNestedFormGroup() {
    let nestedGroup = this.fb.group({
      type: new FormControl(''),
      name: new FormControl(''),
      label: new FormControl(''),
      options: new FormControl(''),
      placeholder: new FormControl(''),
    });
    this.nestedFormArray.push(nestedGroup);
    console.log('nested group', this.nestedFormArray);

    // this.generateForm.addControl(
    //   this.getFormControl('name')?.value || 'group1',
    //   nestedGroup
    // );
    this.generateForm.updateValueAndValidity();
    // console.log('nested group', this.generateForm.controls);
  }

  addNestedControl() {}

  getFormControl(controlName: string) {
    return this.generateForm.get(controlName);
  }
}
