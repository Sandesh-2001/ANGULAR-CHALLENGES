import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DebounceService } from '../services/debounce.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  catchError,
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
  highlightIndex: number = 0;
  @ViewChild('inpRef', { static: true }) inpRef!: ElementRef<any>;
  @ViewChild('ul', { static: true }) ulOFOptions!: ElementRef;
  @Input('inputItems') inputItems: any[] = [];
  @Input('placeholder') placeholder: string = '';
  currentInput: string = '';
  @ViewChild('hid') hid!: ElementRef;

  constructor(
    private _debouce: DebounceService,
    private http: HttpClient,
    private render: Renderer2
  ) {}

  ngAfterViewInit() {
    console.log('ref', this.inpRef);
    fromEvent(this.inpRef.nativeElement, 'input')
      .pipe(
        debounceTime(500),
        // map((el: any) => el.target.value.trim()),
        switchMap((el: any) => {
          this.currentInput = el.target.value;
          return this.http
            .get(
              `https://www.freetestapi.com/api/v1/users?search=${el.target.value}`
            )
            .pipe(
              catchError((err) => {
                console.log(`API error`, err);
                return of([]);
              })
            );
        })
      )
      .subscribe((data: any) => {
        console.log('data in debounce===>>>', data);
        this.inputItems = data;
        this.selectionChange.emit(this.inputItems);
        this.highlightIndex = -1;
        //   if (this.inputItems.find((el) => el.name === this.currentInput))
        //   this.selectionChange.emit(this.currentInput);
        // console.log('input change', searchValue);
      });
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log('event occured', event);
    if (this.inputItems.length === 0) return;
    if (event.key === 'ArrowUp') {
      this.highlightIndex = Math.max(this.highlightIndex - 1, 0);
    }
    if (event.key === 'ArrowDown') {
      this.highlightIndex = Math.min(
        this.highlightIndex + 1,
        this.inputItems.length - 1
      );
      let allList = this.ulOFOptions.nativeElement.querySelectorAll('li');
      console.log('list', allList);
      allList[this.highlightIndex].scrollIntoView({
        behaviour: 'smooth',
        nearest: 'block',
      });
      // this.render.setStyle(
      //   this.ulOFOptions.nativeElement,
      //   'background',
      //   'yellow'
      // );
      // let lis = document.querySelectorAll('li') as any;
    }
    if (event.key === 'Enter') {
      console.log('selected index', this.highlightIndex);
      this.selectionChange.emit(this.inputItems[this.highlightIndex]);
    }
    this.scrollToList();
  }

  scrollToList() {
    let allList = this.ulOFOptions.nativeElement.querySelectorAll('li');
    console.log('list', allList);
    allList[this.highlightIndex].scrollIntoView({
      behaviour: 'smooth',
      nearest: 'block',
    });
  }
}
