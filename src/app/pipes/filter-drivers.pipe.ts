import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterDrivers',
  standalone: true
})
export class FilterDriversPipe implements PipeTransform {

  transform(value: any[], searchText:string): any[] {
    if(!value || !searchText){
      return value;
    }
    const filterValue = searchText.toLowerCase();
    return value.filter(d=>d.id.toLowerCase().includes(filterValue));
  }

}
