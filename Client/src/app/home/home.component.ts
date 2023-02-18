import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PostComponent } from './post/post.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DialogService]
})
export class HomeComponent implements OnInit{
  ref: DynamicDialogRef;
  
  constructor(private dialogService: DialogService) { 
  }
  ngOnInit(): void {
    
  }

  postIdeal(){
    this.ref = this.dialogService.open(PostComponent, {
      header: 'Add ideal',
            width: '90%',
            height: '90%',
            contentStyle: {"max-height": "800px", "overflow": "auto"},
            baseZIndex: 10000,
            // data: hs
  });
  }
}
