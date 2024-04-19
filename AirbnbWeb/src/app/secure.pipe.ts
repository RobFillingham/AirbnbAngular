import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secure',
  standalone: true
})
export class SecurePipe implements PipeTransform {

  transform(url: string): string {



    return url;
  }
}
