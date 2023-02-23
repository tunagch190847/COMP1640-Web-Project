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
        label: 'Department 1',
      },
      {
        label: 'Department 1',
      },
      {
        label: 'Department 1',
      },
      {
        label: 'Department 1',
      },
      {
        label: 'Department 1',
      },
      {
        label: 'Department 1',
      },
      {
        label: 'Department 1',
      },
      
    ];
  }
}


