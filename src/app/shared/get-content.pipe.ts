import { Pipe, PipeTransform } from '@angular/core';

import { ContentsXmlService } from '@core/contents-xml.service'

@Pipe({
  name: 'sharedGetContent'
})
export class GetContentPipe implements PipeTransform {
  constructor(public contentService: ContentsXmlService) {}

  transform(product, content): any {
    if (!product || !content) {
      return null;
    }

    return this.contentService.getContent(product, content);
  }

}
