import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeAndSpaceWords'
})
export class CapitalizeAndSpaceWordsPipe implements PipeTransform {
  transform(value: string): string {
    if (value && value.length > 0) {
      const words = value.split(/(?=[A-Z])/); // Split the words based on capital letters
      for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
      }
      return words.join(' ');
    }
    return value;
  }
}