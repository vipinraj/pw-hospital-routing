import {Inject, Pipe, PipeTransform} from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';

@Pipe({
  name: 'assests'
})
export class AssestsPipe implements PipeTransform {
  baseUrl: string;
  constructor(@Inject(APP_BASE_HREF) baseHref: string) {
    this.baseUrl = baseHref;
  }

  transform(value: string) {
    console.log(value);
    var newval = value;
    if ( !(value.startsWith('http://') || value.startsWith('https://') )) {
      if (this.baseUrl !== '/') {
        newval = this.baseUrl + value;
      }
    }
    console.log("new val: "  + newval);
    return newval;
  }

}
