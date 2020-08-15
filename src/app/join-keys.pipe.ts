import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'joinKeys',
})
export class JoinKeysPipe implements PipeTransform {
  transform(obj: Object, separator: string): string {
    return Object.keys(obj).join(separator);
  }
}
