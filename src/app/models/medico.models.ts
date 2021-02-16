import { Hospital } from "./hospital.models";

interface MedicoUsuario {
    _id: string,
    nombre: string,
    img: string
}

export class Medico {
    constructor(
        public _id: string,
        public nombre?: string,
        public img?: string,
        public usuario?: MedicoUsuario,
        public hospital?: Hospital,

    ) {

    }
}