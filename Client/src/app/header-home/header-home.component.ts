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
        label: 'Thoi su',
      },
      {
        label: 'tin tuc',
      },
      {
        label: 'cuu tro',
      },
      {
        label: 'Phim',
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
      
    ];
  }
}


