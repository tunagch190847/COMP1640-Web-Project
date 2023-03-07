import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit{
  apiUrl:string = "http://localhost:3009/api/idea";
  categories  = [
    {name: 'A'},
    {name: 'B'},
    {name: 'C'},
    {name: 'D'},
    {name: 'E'}
];
formGroup: FormGroup<{
  category: FormControl<string>;
  title: FormControl<string>;
  content: FormControl<string>;

}>;
  constructor(private dialogService: DialogService, public config: DynamicDialogConfig, 
    private http : HttpClient, private authService: AuthenticationService,){
      

  }
  SaveIdea(){

  }
  ngOnInit(): void {
    this.formGroup = new FormGroup({
      category: new FormControl(null, [Validators.required]),
      title: new FormControl(null, [Validators.required]),
      content: new FormControl(null, [Validators.required]),
    });
  }

  closeDialog(){
    this.dialogService.dialogComponentRefMap.forEach(dialog => {dialog.destroy();})
  }
}
