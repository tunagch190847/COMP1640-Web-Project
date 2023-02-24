import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {

  selectedNode: any;
  nodes1: any[];
  like: boolean = false;
  dislike: boolean = false;
  comment_value: string;
  
  ngOnInit(): void {
    this.nodes1 = [
      {
        label: 'Category',
      },
      {
        label: 'Category',
      },
      {
        label: 'Category',
      },
      {
        label: 'Category',
      },
      {
        label: 'Category',
      },
      {
        label: 'Category',
      },
      {
        label: 'Category',
      },
    ]
  }
}
