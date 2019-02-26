import { Component } from '@angular/core';
import { FormLanguageService } from '../../form-language.service';

@Component({
  selector: 'tell-us-metadata',
  styleUrls: ['./metadata.component.scss'],
  templateUrl: './metadata.component.html'
})
export class MetadataComponent {
  constructor(public languageService: FormLanguageService) {}

  onLanguageSelect(languageId: string) {
    this.languageService.getLanguage(languageId);
  }

  /**
   * Checks for changes to data by index
   *
   * @param index
   *    index of array
   * @param item
   *    impact-link product
   */
  trackByIndex(index, item) {
    return index;
  }
}
