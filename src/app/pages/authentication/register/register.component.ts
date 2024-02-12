import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class AppSideRegisterComponent {
  baseUrl = environment.baseUrl;
username: any;
email: any;
password: any;
first_name: any;
last_name: any;
phone_number: any;
marital_status: any;
home_address: any;
gender: any;
date_birth: Date;
step: number = 1;
  constructor(
    private router: Router,
    ) {}


  onSubmit(form: any) {
    console.log(form.value)
    const formattedDate = form.value.date_birth?.toISOString().split('T')[0]
    
    const body = {
      first_name: form.value.first_name,
      date_birth: formattedDate,
      email: form.value.email,
      gender: form.value.gender,
      home_address: form.value.home_address,
      last_name: form.value.last_name,
      marital_status: form.value.marital_status,
      password: form.value.password,
      phone_number: form.value.phone_number
    }

    console.log(body)

    form.reset()
  }
}
