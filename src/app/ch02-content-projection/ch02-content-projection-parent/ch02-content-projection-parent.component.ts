import { Component, ViewChild } from '@angular/core';
import { Child01Component } from '../components/child01/child01.component';
import { Child02Component } from "../components/child02/child02.component";

@Component({
  selector: 'app-ch02-content-projection-parent',
  standalone: true,
  imports: [Child01Component, Child02Component],
  templateUrl: './ch02-content-projection-parent.component.html',
  styleUrl: './ch02-content-projection-parent.component.css',
})
export class Ch02ContentProjectionParentComponent {
  @ViewChild(Child01Component) child01!: Child01Component;

  ngAfterViewInit() {
    console.log('child component', this.child01);
    setTimeout(() => {
      this.child01.name = 'aniket';
    }, 4000);
    
  }
}
