export class Triangle {
  path: string = null;
  radius: number = null;
  transform: string = null;

  constructor(radius) {
    this.radius = this.getTriangleRadius(radius);
    this.path = this.getTrianglePath(this.radius);
    this.transform = this.getTriangleTransform(this.radius);
  }

  /**
   * Returns a plottable SVG path for a triangle with radius
   * @param r
   *    The triangle's radius
   */
  getTrianglePath (r) {
    return `0,${r}, ${r/2},0 ${r},${r}`;
  }

  /**
   * Returns a triangle "radius" to match a circle of input radius
   * @param r
   *    Input radius
   */
  getTriangleRadius (r) {
    return r * 2;
  }

  /**
   * Returns a transform to center a triangle SVG in its container
   * @param r
   *    The triangle's radius
   */
  getTriangleTransform (r) {
    return `translate(${-r/2},${-r/2})`;
  }
}
