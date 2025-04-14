import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  imports: [],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css',
})
export class SideMenuComponent {
  @Output() selectedFile: EventEmitter<any> = new EventEmitter();
  onSelectedFile(event: Event) {
    this.selectedFile.emit(event);
  }
  ngOnInit() {}
}

/*
  
  <aside class="w-52">
    <label for="changeVideo">
      <h2>Change video</h2>
      <input
        id="changeVideo"
        type="file"
        hidden
        (change)="onSelectFile($event)"
      />
    </label>
  </aside>

*/
