import { Pipe, PipeTransform } from '@angular/core';

/**
 * Checks a product's product.properties['reviewed-status'] input and returns
 * boolean
 */
@Pipe({
  name: 'sharedProductReviewed'
})
export class ProductReviewedPipe implements PipeTransform {
  transform(reviewedStatus): any {
    if (reviewedStatus && reviewedStatus.toLowerCase() === 'reviewed') {
      return true;
    }
    return false;
  }
}
