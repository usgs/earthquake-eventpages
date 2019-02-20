import { Component } from '@angular/core';
import { FormLanguageService } from '../../form-language.service';

@Component({
  selector: 'tell-us-metadata',
  styleUrls: ['./metadata.component.scss'],
  templateUrl: './metadata.component.html'
})
export class MetadataComponent {
  constructor(public languageService: FormLanguageService) {}
}
