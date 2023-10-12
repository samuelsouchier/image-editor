import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ArtboardComponent } from '../../components/artboard/artboard.component';
import { IconComponent } from '../../components/icon/icon.component';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { TooltipDirective } from '../../directives/tooltip.directive';
import { UploadedFile } from '../../model/uploaded-file';
import { WidgetStore } from '../../stores/widget.store';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, IconComponent, TooltipDirective, DragDropModule, ToolbarComponent, ArtboardComponent],
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent {
  selectedFile = this.widgetStore.selectedFile;

  @ViewChild('artboard') artboard: ElementRef;

  constructor(private widgetStore: WidgetStore) {}
  onSelectFile(input: EventTarget | null) {
    if (input) {
      const file = (input as HTMLInputElement).files?.item(0);
      const uploadFile: UploadedFile | null = file ? {id: crypto.randomUUID(), file: file} : null;
      this.selectedFile.update(() => uploadFile);
    }
  }
}
