import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { iconByNameMapper, IconName } from '../../model/icon-name';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {
  @Input({required: true}) iconName: IconName;
  icon: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {
  }
  ngOnInit() {
    this.icon = this.sanitizer.bypassSecurityTrustHtml(iconByNameMapper[this.iconName]);
  }
}
