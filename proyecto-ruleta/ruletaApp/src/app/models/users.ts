export class User{
    constructor(
        public sub:number,
        public nombre:string,
        public apellido:string,
        public role:string,
        public email:string,
        public password:string,
        public puntaje:number,
        public turnos:number
    ){}
}
