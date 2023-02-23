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
  items: MenuItem[];

  ngOnInit() {
    this.items = [
      { label: 'View profile', icon: 'pi pi-users' },
      { label: 'Settings', icon: 'pi pi-fw pi-download' },
      { label: 'Log out', icon: 'pi pi-sign-out' }
    ];
  }
}
