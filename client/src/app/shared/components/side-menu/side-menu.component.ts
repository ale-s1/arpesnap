import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Output,
  signal,
  ViewChild,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AudioService } from '@app/core/services/audio.service';
import { VideoService } from '@app/core/services/video.service';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css',
})
export class SideMenuComponent {
  @Output() selectedFile: EventEmitter<Event> = new EventEmitter();
  @Output() extractAudio: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('extractAudioCheckBox') extractAudioCheckBox!: HTMLInputElement;
  readonly panelState = signal(false);
  formDisabled = true;

  constructor(
    private videoService: VideoService,
    private audioService: AudioService
  ) {
    // disable the form if no file is selected
    this.videoService.getState().subscribe((state) => {
      const fileSelected = state.isFileSelected;
      this.formDisabled = !fileSelected;
    });
  }

  togglePanel() {
    this.panelState.update((state) => !state);
  }
  onSelectedFile(event: Event) {
    this.selectedFile.emit(event);
  }

  onCheckboxChange(event: any) {
    this.extractAudio.emit(event.target.checked);
  }
}
