import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MegaMenuItem } from 'primeng/api';
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
  items: MenuItem[];
  categories!: MegaMenuItem[];

  ngOnInit() {
    this.items = [
      { label: 'View profile', icon: 'pi pi-users' },
      { label: 'Settings', icon: 'pi pi-fw pi-download' },
      { label: 'Log out', icon: 'pi pi-sign-out' }
    ];

    this.categories = [
      {
        label: 'Categories', icon: 'pi pi-list',
        items: [
          [
            {

              items: [{ label: 'Video 1.1' }, { label: 'Video 1.2' }, { label: 'Video 1.3' }, { label: 'Video 1.4' }]
            },
          ],
          [
            {

              items: [{ label: 'Video 3.1' }, { label: 'Video 3.2' }, { label: 'Video 3.2' }, { label: 'Video 3.2' }]
            },
          ],
          [
            {

              items: [{ label: 'Video 3.1' }, { label: 'Video 3.2' }, { label: 'Video 3.2' }, { label: 'Video 3.2' }]
            },
          ],
          [
            {

              items: [{ label: 'Video 3.1' }, { label: 'Video 3.2' }, { label: 'Video 3.2' }, { label: 'Video 3.2' }]
            },
          ]
        ]
      },
    ]
  }
}
