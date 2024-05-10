import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  router = inject(Router);
  fb = inject(FormBuilder);
  fg: FormGroup = this.fb.group({
    username: this.fb.control('', { nonNullable: true }),
    password: this.fb.control('', { nonNullable: true })
  });

  login() {
    this.router.navigateByUrl('/dashboard');
  }

}
