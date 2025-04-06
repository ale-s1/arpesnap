import { Component } from '@angular/core';
import { LogoutButtonComponent } from '../../../buttons/logout-button/logout-button.component';

@Component({
  selector: 'app-desktop-nav-bar-buttons ',
  imports: [LogoutButtonComponent],
  templateUrl: './nav-bar-buttons.component.html',
  styleUrl: './nav-bar-buttons.component.css',
})
export class NavBarButtonsComponent {}
