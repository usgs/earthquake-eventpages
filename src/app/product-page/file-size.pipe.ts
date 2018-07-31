import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'fileSize'
})
export class FileSizePipe implements PipeTransform {

  transform(size: number, precision = 1): string {
    let formatted,
        index;

    const factor = Math.pow(10, precision);

    const units = [
      'B', 'KB', 'MB', 'GB', 'TB', 'PB'
    ];

    for (index = 0; index < units.length && size > 1024; index++) {
      size /= 1024;
    }

    formatted = (Math.round(size * factor) / factor).toFixed(precision);

    return formatted + ' ' + units[index];
  }
}
