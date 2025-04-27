import { SocialLoginModule } from '@abacritt/angularx-social-login';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GoogleSignInComponent } from './components/google-sign-in/google-sign-in.component';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    GoogleSignInComponent,
    SocialLoginModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ng-google-login-integrated';
  loginState = new BehaviorSubject<boolean>(false);
  loginState$ = this.loginState.asObservable();

  constructor (private authService: AuthService) {
    this.authService.loginState$.subscribe(status => {
      this.loginState.next(status);
      this.initOneTap();
    });
  }

  async initOneTap() {
    await new Promise(resolve => setTimeout(resolve, 500));
    if (window.google && window.google.accounts && window.google.accounts.id) {
      let state = this.loginState.value;
      if (state === false)
      {
        console.log(state);
        window.google.accounts.id.prompt();
      }
    } else {
      console.warn('Google Identity Services script not loaded yet.');
    }
  }

  googleSignin(googleWrapper: any) {
    googleWrapper.click();
  }

  logOut() {
    this.authService.logOut();
  }
}
