import { Post } from "./Post.model";

export class Employee {
    id! : number;
    post! : Post
    nom! : string;
    prenom! : string;
    sexe! : string;

    constructor(employee: Employee){
        this.id = employee.id;
        this.nom = employee.nom;
        this.prenom = employee.prenom;
        this.sexe = employee.sexe;
        this.post = employee.post;
    }
}