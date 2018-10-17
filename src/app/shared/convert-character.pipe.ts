import { Pipe, PipeTransform } from '@angular/core';

/**
 * This is a conversion pipe. It accepts an arbitrary value, and will check
 * against a user input array to see if that value matches a set of preset
 * chars/strings (in this case property name values). If the input value matches
 * any of those, it will return the value of the third argument.
 *
 * This pipe was created because property names on shakemap offshore events used
 * to be '--', or '-', and have now switched to null values. This pipe allows us
 * backwards compatibility in the case that not all those values were in fact
 * updated to null. This pipe can be used for other instances if they arise
 *
 * @param value
 *     The input value used to check against the second parameter
 * @param backwardsCompatChars
 *     An array of chars/strings input from the template, which would be the
 *     potential value of object property names
 * @param returnChar
 *     The character or string to return to render on the page if the first
 *     parameter is inside the second parameter array
 * @returns returnValue
 *     Either the original first parameter value, or if there's a match, the
 *     value of the third parameter
 */
@Pipe({
  name: 'convertCharacter'
})
export class ConvertCharacterPipe implements PipeTransform {
  transform(value: any, backwardsCompatChars: any, returnChar: any): any {
    let returnValue = value;

    backwardsCompatChars.forEach(char => {
      if (value === char) {
        returnValue = returnChar;
      }
    });

    return returnValue;
  }
}
