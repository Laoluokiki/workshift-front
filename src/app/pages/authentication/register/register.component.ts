import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';
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
formState: "first" | "second" = "first"
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private notifier: NotificationService
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
      phone_number: form.value.phone_number.toString()
    }

    console.log(body)
    this.authService.register(body).subscribe((response: any)=>{
      console.log(response)
      this.notifier.success('Welcome Aboard! '+response.first_name)
    },error =>{
      console.log(error.error.detail)
    })

    form.reset()
  }

  toggleForm(){
    if(this.formState === 'first')
      this.formState = 'second'
    else this.formState = 'first'
  }
}
