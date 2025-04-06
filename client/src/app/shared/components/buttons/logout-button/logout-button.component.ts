import { DOCUMENT } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-logout-button',
  imports: [],
  templateUrl: './logout-button.component.html',
  styleUrl: './logout-button.component.css',
})
export class LogoutButtonComponent {
  private auth = inject(AuthService);
  private doc = inject(DOCUMENT);

  logout() {
    this.auth.logout({
      logoutParams: {
        returnTo: this.doc.location.origin,
      },
    });
  }
}
