import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/core/services/auth.service';

type SignIn = {
  username: FormControl;
  password: FormControl;
  rememberUser: FormControl;
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  signInForm!: FormGroup;

  apiUsername: string = "mor_2314";
  apiPassword: string = "83r5^_";

  constructor(private router: Router, private auth: AuthService,
    private toast: NgToastService) {
    this.signInForm = new FormGroup<SignIn>({
      username: new FormControl('', [Validators.required, Validators.minLength(8)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      rememberUser: new FormControl(Boolean)
    })
  }

  get fc() {
    return this.signInForm.controls;
  }

  submit() {
    const { username, password, rememberUser } = this.signInForm.value;

    if (username !== '' && password !== '') {
      this.auth.authUser({ username, password, rememberUser })
      .subscribe(result => {
        this.toast.success({ detail: 'Success Message', summary: 'You have successfully logged in!', duration: 5000 });
        this.router.navigate(['main/home']);
      })
    }
    else {
      this.toast.error({ detail: 'Oops!', summary: 'Invalid username and password!', duration: 3000 });
     }
  }

  reset() {
    this.signInForm.reset();
  }

}
