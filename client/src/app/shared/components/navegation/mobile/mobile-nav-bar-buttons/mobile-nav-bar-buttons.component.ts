import { Component } from '@angular/core';
import { LogoutButtonComponent } from '../../../buttons/logout-button/logout-button.component';

@Component({
  selector: 'app-mobile-nav-bar-buttons',
  imports: [LogoutButtonComponent],
  templateUrl: './mobile-nav-bar-buttons.component.html',
  styleUrl: './mobile-nav-bar-buttons.component.css',
})
export class MobileNavBarButtonsComponent {}
