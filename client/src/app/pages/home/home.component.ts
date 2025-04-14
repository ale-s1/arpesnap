import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LoginButtonComponent } from '@app/shared/components/buttons/login-button/login-button.component';
import { NavBarButtonsComponent } from '@app/shared/components/navegation/desktop/nav-bar-buttons/nav-bar-buttons.component';
import { MobileNavBarButtonsComponent } from '@app/shared/components/navegation/mobile/mobile-nav-bar-buttons/mobile-nav-bar-buttons.component';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    LoginButtonComponent,
    NavBarButtonsComponent,
    MobileNavBarButtonsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private auth = inject(AuthService);
  isAuthenticated$ = this.auth.isAuthenticated$;
}
