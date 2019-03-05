export class Triangle {
  path: string = null;
  radius: number = null;
  transform: string = null;

  constructor(radius) {
    this.radius = this.getTriangleRadius(radius);
    this.path = this.getTrianglePath(this.radius);
    this.transform = this.getTriangleTransform(this.radius);
  }

  getTrianglePath (r) {
    return `0,${r}, ${r/2},0 ${r},${r}`;
  }

  getTriangleRadius (r) {
    return r * 2;
  }

  getTriangleTransform (r) {
    return `translate(${-r/2},${-r/2})`;
  }
}