import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estado'
})
export class EstadoPipe implements PipeTransform {

  transform(value: boolean, args?: any): string {
    if(value){
      return 'Activo';
    }else{
      return 'Inactivo';
    }
  }

}
