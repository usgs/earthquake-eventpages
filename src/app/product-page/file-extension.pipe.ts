import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileExtension'
})
export class FileExtensionPipe implements PipeTransform {
  transform(path: string): string {
    if (!path) {
        return null;
    }

    // split path on "/", keeping everything after
    const file = path.split('/').pop();
    // split file on ".", keeping everything after
    const extension = file.split('.').pop();

    return extension;
  }
}
