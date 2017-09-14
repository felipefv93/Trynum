export class Usuario{
    nombre:string;
    apellidoPaterno:string;
    apellidoMaterno:string;
    correo:string;
    nombreUsuario:string;
    nombreMostrar:string;
    telefono:string;
    descripcion:string;
    fechaCreacion:number;
    opciones:any;
    roles:any;

    constructor(){
        this.nombre='';
        this.apellidoPaterno='';
        this.apellidoMaterno='';
        this.correo='';
        this.nombreUsuario='';
        this.nombreMostrar='';
        this.telefono='';
        this.descripcion='';
        this.fechaCreacion=0;
        this.opciones={configuracionInicial:false};
        this.roles={admin:false,ecommerce:false};
    }
    
}