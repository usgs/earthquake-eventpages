import { Pipe, PipeTransform } from '@angular/core';


// Mock a pipe
// Credit: https://github.com/cnunciato/ng2-mock-component/issues/14
export function MockPipe (name: string): any {
  @Pipe({ name })
  class MockPipe implements PipeTransform {
    transform (input: any, ...args: any): any {
      return input;
    }
  }

  return MockPipe;
}
