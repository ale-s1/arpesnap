import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-export-media',
  imports: [RouterModule],
  templateUrl: './export-media.component.html',
  styleUrl: './export-media.component.css',
})
export class ExportMediaComponent {
  exportMedia() {
    console.log('hello');
  }
}
