import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { ILogin } from 'src/app/core/model/auth.model';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private _auth: AuthenticationService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = fb.group({
      username: ['', [Validators.required,]],
      password: ['', Validators.required],
    });
  }

  login() {
    const payload: ILogin = {
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value,
    };
    this._auth.login(payload).subscribe({
      next: () => {
        this.router.navigate(['/main']);
      },
    });
  }

  ngOnInit(): void {
    
  }
}
