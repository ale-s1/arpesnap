import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LogoutButtonComponent } from '@app/shared/components/buttons/logout-button/logout-button.component';

@Component({
  selector: 'app-desktop-nav-bar-buttons ',
  imports: [LogoutButtonComponent, RouterModule],
  templateUrl: './nav-bar-buttons.component.html',
  styleUrl: './nav-bar-buttons.component.css',
})
export class NavBarButtonsComponent {}
