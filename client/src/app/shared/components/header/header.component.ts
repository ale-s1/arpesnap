import { Component } from '@angular/core';
import { ExportMediaComponent } from '../buttons/export-media/export-media.component';

@Component({
  selector: 'app-header',
  imports: [ExportMediaComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {}
