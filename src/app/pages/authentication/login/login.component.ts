import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ILogin } from 'src/app/core/model/auth.model';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent implements OnInit {
  userType: 'admin' | 'user';
  loginForm: FormGroup;
  constructor(
    private _auth: AuthenticationService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.loginForm = fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    const payload: ILogin = {
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value,
    };
    this._auth.login(payload, this.userType).subscribe({
      next: () => {
        this.router.navigate(['/main']);
      },
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (param: any) => {
        if (param?.userType != 'admin' && param?.userType != 'user') {
          this.router.navigateByUrl('/');
        }
        this.userType = param?.userType;
      },
    });
  }
}
