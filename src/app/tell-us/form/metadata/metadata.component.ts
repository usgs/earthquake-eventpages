import { Component, Input } from '@angular/core';
import { FormLanguageService } from '../form-language.service';
import { TellUsText } from '../form-language/tell-us-text';

@Component({
  selector: 'tell-us-metadata',
  styleUrls: ['./metadata.component.scss'],
  templateUrl: './metadata.component.html'
})
export class MetadataComponent {
  @Input()
  language: string;

  constructor(public languageService: FormLanguageService) {}

  onLanguageSelect(languageId: string) {
    this.languageService.getLanguage(languageId);
  }
}
