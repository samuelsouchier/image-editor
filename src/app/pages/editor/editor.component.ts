import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ArtboardComponent } from '../../components/artboard/artboard.component';
import { IconComponent } from '../../components/icon/icon.component';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { TooltipDirective } from '../../directives/tooltip.directive';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, IconComponent, TooltipDirective, DragDropModule, ToolbarComponent, ArtboardComponent],
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent {
  selectedFile: File | null;

  @ViewChild('artboard') artboard: ElementRef;

  onSelectFile(input: EventTarget | null) {
    if (input) {
      this.selectedFile = (input as HTMLInputElement).files?.item(0) ?? null;
    }
  }
}
