import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IconComponent } from '../../components/icon/icon.component';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent {

}
