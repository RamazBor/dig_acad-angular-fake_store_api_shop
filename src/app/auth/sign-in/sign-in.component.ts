import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/core/services/auth.service';

type SignIn = {
  userName: FormControl;
  password: FormControl;
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  signInForm!: FormGroup;

  userName: string = "mor_2314";
  password: string = "83r5^_";

  constructor(private router: Router, private auth: AuthService,
    private toast: NgToastService) {
    this.signInForm = new FormGroup<SignIn>({
      userName: new FormControl('', [Validators.required, Validators.minLength(8)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  get fc() {
    return this.signInForm.controls;
  }

  submit() {
    const { userName, password } = this.signInForm.value;

    if (userName === 'mor_2314' && password === '83r5^_') {
      this.auth.authUser({ username: userName, password: password }).subscribe(result => {
        this.toast.success({ detail: 'Success Message', summary: 'You have successfully logged in!', duration: 5000 });
        this.router.navigate(['main/home']);
      })
    }
    else if (userName !== '' && userName !== 'mor_2314' && password !== '' && password !== '83r5^_') {
      this.toast.error({ detail: 'Oops!', summary: 'Invalid username and password!', duration: 3000 });
    }
    else if (userName !== '' && password === '83r5^_') {
      this.toast.error({ detail: 'Oops!', summary: 'Invalid username!', duration: 3000 });
    }
    else if (userName === 'mor_2314' && password !== '') {
      this.toast.error({ detail: 'Oops!', summary: 'Invalid password!', duration: 3000 });
    }
    else if (userName === '' && password !== '') {
      this.toast.error({ detail: 'Oops!', summary: 'Please, fill in username field!', duration: 3000 });
    }
    else if (userName !== '' && password === '') {
      this.toast.error({ detail: 'Oops!', summary: 'Please, fill in password field!', duration: 3000 });
    }
    else {
      this.toast.error({ detail: 'Oops!', summary: 'Please, fill in this fields!', duration: 3000 });
    }
  }

  reset() {
    this.signInForm.reset();
  }

}
