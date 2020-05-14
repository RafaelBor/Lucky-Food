export class Admin{
    constructor(
        public id: number,
        public usuario: string,
        public role: string,
        public email: string,
        public password: string,
        public image: string
    ){}
}