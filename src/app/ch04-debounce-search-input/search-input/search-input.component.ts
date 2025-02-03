import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DebounceService } from '../services/debounce.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  concatMap,
  debounce,
  debounceTime,
  exhaustMap,
  fromEvent,
  map,
  mergeMap,
  of,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'app-search-input',
  standalone: true,
  providers: [DebounceService],
  imports: [FormsModule, HttpClientModule],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.css',
})
export class SearchInputComponent implements AfterViewInit {
  @Output('selectionChange') selectionChange: EventEmitter<any> =
    new EventEmitter<any>();

  @ViewChild('inpRef', { static: true }) inpRef!: ElementRef<any>;

  @Input('inputItems') inputItems: any[] = [];
  @Input('placeholder') placeholder: string = '';
  currentInput: string = '';
  @ViewChild('hid') hid!: ElementRef;

  constructor(private _debouce: DebounceService, private http: HttpClient) {}

  ngAfterViewInit() {
    console.log('ref', this.inpRef);
    fromEvent(this.inpRef.nativeElement, 'input')
      .pipe(
        debounceTime(500),
        switchMap((el: any) => {
          this.currentInput = el.target.value;
          return this.http.get(
            `http://localhost:8080/search?name=${el.target.value}`
          );
        })
      )
      .subscribe((data: any) => {
        console.log('data in debounce===>>>', data);
        this.inputItems = data.results;
        this.selectionChange.emit(this.inputItems);
        //   if (this.inputItems.find((el) => el.name === this.currentInput))
        //   this.selectionChange.emit(this.currentInput);
        // console.log('input change', searchValue);
      });
  }
}
