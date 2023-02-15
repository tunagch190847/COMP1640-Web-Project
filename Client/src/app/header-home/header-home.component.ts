import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header-home',
  templateUrl: './header-home.component.html',
  styleUrls: ['./header-home.component.css']
})
export class HeaderHomeComponent {
  items!: MenuItem[];

  ngOnInit() {
    this.items = [
      {
        label: 'Category 1',
      },
      {
        label: 'Category 2',
      },
      {
        label: 'Category 3',
      },
      {
        label: 'Category 4',
      },
      {
        label: 'Category 5',
      },
      {
        label: 'Category 6',
      },
      {
        label: 'Category 7',
      },
      {
        label: 'Category 8',
      },
      {
        label: 'Category 9',
      },
      {
        label: 'Category 10',
      },
      
    ];
  }
}


