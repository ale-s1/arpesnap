import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login-button',
  imports: [],
  templateUrl: './login-button.component.html',
  styleUrl: './login-button.component.css',
})
export class LoginButtonComponent {
  private auth = inject(AuthService);
  login() {
    //this.auth.logout();

    this.auth.loginWithRedirect({
      appState: {
        target: '/public/media',
      },
      authorizationParams: {
        screen_hint: 'signup',
      },
    });
  }
}
