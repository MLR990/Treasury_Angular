import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoginFormSubmitted: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  get login_emailControl(): any {
    return this.loginForm.controls['email'];
  }

  get login_passwordControl(): any {
    return this.loginForm.controls['password'];
  }

  loginSubmitted() {
    this.isLoginFormSubmitted = true;

    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response: any) => {
          console.log(response);

          this.isLoginFormSubmitted = false;
          // this.authService.currentUserName = response.email;
          // localStorage['token'] = response.token;
          // localStorage['refreshToken'] = response.refreshToken;

          this.router.navigate(['/transactions']);

          this.loginForm.reset();
        },

        error: (error: any) => {
          console.log(error);
        },

        complete: () => {},
      });
    }
  }
}
