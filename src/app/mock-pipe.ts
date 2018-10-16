import { Pipe, PipeTransform } from '@angular/core';

// Mock a pipe
// Credit: https://github.com/cnunciato/ng2-mock-component/issues/14
export function MockPipe(name: string, transform?): any {
  const defaultTransform = (input: any, ...args: any[]): any => {
    return input;
  };

  @Pipe({ name })
  class MockPipeImpl implements PipeTransform {
    transform = transform || defaultTransform;
  }

  return MockPipeImpl;
}
