import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {
  searchTerm!:string;
  transform(list: any[], filterText: string): any {
    console.log("transform");
    return list ? list.filter(item =>
    item.nom.toLowerCase().includes(filterText)) : [];
    }

}
