import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isArray',
})
export class IsArrayPipe implements PipeTransform {
  transform(value: unknown): boolean {
    return Array.isArray(value);
  }
}
