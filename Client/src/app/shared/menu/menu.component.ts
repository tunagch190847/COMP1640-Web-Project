import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
interface Country {
  name: string,
  code: string
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  display: any;
  value3: any;
  items: MenuItem[] = [];

  constructor(private router: Router) { }

  ngOnInit() {
    this.items = [
      {
        label: 'Filter',
        icon: 'pi pi-pw pi-file',
        items: [
          { label: 'Category 1', },
          { label: 'Category 2', },
          { label: 'Category 3', },
          { label: 'Category 4', },
          { label: 'Category 5', },
          { label: 'Category 6', },
        ]
      },
    ];
  }
}
