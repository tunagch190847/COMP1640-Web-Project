import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit{
  categories  = [
    {name: 'A'},
    {name: 'B'},
    {name: 'C'},
    {name: 'D'},
    {name: 'E'}
];
  constructor(private dialogService: DialogService, public config: DynamicDialogConfig){

  }
  ngOnInit(): void {
    
  }

  closeDialog(){
    this.dialogService.dialogComponentRefMap.forEach(dialog => {dialog.destroy();})
  }
}
