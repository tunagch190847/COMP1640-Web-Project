import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  url: string = 'http://localhost:3009/api/user/login';
  submitted: boolean = false;
  errors: string[] = [];

  formGroup: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
    checked: FormControl<boolean>;
  }>;
  constructor(private http: HttpClient, protected router: Router) {}

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      checked: new FormControl<boolean>(true),
    });
  }

  Save(): void {
    // this.http
    //   .get('https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS', {
    //     headers: { 'Access-Control-Allow-Origin': '*' },
    //   })
    //   .subscribe((result) => {
    //     console.log(result);
    //   });
  
    this.http.post<any>(this.url,
        {
          email: 'admin@gmail.com',
          password: '123456',
        })
      .subscribe((result) => {
        console.log(result);
      });
  }
}
