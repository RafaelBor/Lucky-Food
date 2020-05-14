export class Restaurante{
    constructor(
        public id:number,
        public id_admin:number,
        public email:string,
        public nombre:string,
        public descripcion:string,
        public direccion:string,
        public numero_tel:string,
        public ganacias:number,
        public pago_cupones:number,
        public password: string,

    ){}
}