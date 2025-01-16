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
  isShowGeneralModal: boolean = false;
  isFormCreated: boolean = true;
  formName: string = 'login';
  generateForm: FormGroup = new FormGroup({});
  // typeGroupArray: FormArray = new FormArray<any>([]);
  formArrayItems: FormArray = new FormArray<any>([]);
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
        console.log('updated form', this.generateForm);
      }
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
    let group: any = {
      type: new FormControl('', [Validators.required, Validators.minLength(3)]),
      placeholder: new FormControl('', Validators.required),
      label: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      options: this.optionsArray,
    };
    return this.fb.group(group);
  }

  addControl(controlName?: string, validators?: any[]) {
    let updatedOption = this.generateForm.value.options;
    updatedOption = updatedOption.map((data: any) => data['option']);
    this.newControl.emit({
      ...this.generateForm.value,
      options: updatedOption,
    });
    this.generateForm.reset();
    this.optionsArray = new FormArray<any>([]);
  }

  createNewControl() {
    this.optionsArray.push(new FormControl('option1'));
  }
  createNewGroup(validators: any = ['required']): void {
    let optionGroup = this.fb.group({ option: new FormControl('') });
    this.optionsArray.push(optionGroup);
    // return optionGroup;
  }
  getFormControl(controlName: string) {
    return this.generateForm.get(controlName);
  }
}
