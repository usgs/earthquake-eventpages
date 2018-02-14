import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'downloadItem'
})
export class DownloadItem implements PipeTransform {
  transform(item: any): string {
    return [
      `<span class="title">${item.title}</span>`,
      `<span class="caption">${item.caption}</span>`,
      '<ul class="formats">',
        item.formats.map((format) => {
          return [
            '<li class="format">',
              `<a href="${format.url}">`, format.type.toUpperCase(),
              ' (', this.fileSize(format.length), ')',
            '</li>'
          ].join('');
        }).join(''),
      '</ul>'
    ].join('');
  }

  fileSize (size: number): string {
    let index: number;
    const units = [
      'B', 'KB', 'MB', 'GB' // Should not be > GB
    ];

    for (index = 0; index < units.length && size > 1024; index++) {
      size /= 1024;
    }

    return (Math.round(size * 10) / 10) + ' ' + units[index];
  };
}
