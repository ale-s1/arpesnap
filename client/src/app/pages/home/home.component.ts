import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { LoginButtonComponent } from '../../shared/components/buttons/login-button/login-button.component';
import { NavBarButtonsComponent } from '../../shared/components/navegation/desktop/nav-bar-buttons/nav-bar-buttons.component';
import { MobileNavBarButtonsComponent } from '../../shared/components/navegation/mobile/mobile-nav-bar-buttons/mobile-nav-bar-buttons.component';

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
