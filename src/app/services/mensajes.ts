import { Injectable } from '@angular/core';

declare var swal:any;
@Injectable()
export class MensajesService {

    constructor() { }
    loading(estado:boolean){
        if(estado){
          swal({ 
            // timer: 4000,
            showConfirmButton: false,
            background:'opacity: 0.1',
            allowOutsideClick:false,
            html:
            '<br><br><br>'+
            '<div class="loader">'+
                '<svg class="circular" viewBox="25 25 50 50">'+
                    '<circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>'+
                '</svg>'+
            '</div>'
         });
        }else{
          swal.close();
        }
        
    }

    correcto(mensaje:string){
        swal(
            'Correcto!',
            mensaje,
            'success'
          )
    }
    error(mensaje:string){
        swal(
            'Error!',
            mensaje,
            'error'
          )
    }
}