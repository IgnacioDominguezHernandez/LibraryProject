export class User {
  
//ng generate class nombre

    _id?: string;
    nombre: string;
    apellido: string;
    edad: number;
    email: string;
    password: string;

    constructor(_id = "", nombre = "", apellido = "", edad = 0, email = "", password = "") {
        this._id = _id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.email = email;
        this.password = password;
      }

}
