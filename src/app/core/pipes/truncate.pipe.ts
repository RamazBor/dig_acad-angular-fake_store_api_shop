import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, limit: number): string {
    let result = value || "";
    if (value) {
      const words: string[] = value.split(/\s/)
      if (words.length > limit) {
        if (limit < 0) {
          console.log(limit);
          result = '...' + words.slice(words.length - limit, words.length).join(" ");
          return result;
        } else {
          result = words.slice(0, limit).join(" ") + "..."
          return result;
        }
      }
      return value;
    }
    return '';
  }

}
