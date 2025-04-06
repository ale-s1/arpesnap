import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-media',
  imports: [],
  templateUrl: './media.component.html',
  styleUrl: './media.component.css',
})
export class MediaComponent {
  auth = inject(AuthService);

  ngOnInit() {
    this.auth.isAuthenticated$.subscribe((v) => {
      console.log(v);
    });
  }
}
