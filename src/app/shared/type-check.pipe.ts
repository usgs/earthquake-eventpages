import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeCheck'
})
export class ResponseTypeCheckPipe implements PipeTransform {
  transform(value: any, ...propertyName: any): boolean {}
}
