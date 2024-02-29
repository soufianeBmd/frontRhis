export class EmployeePost {
    nbrEmployes: number;
    nomPoste: string;

    public constructor(data: EmployeePost){
        this.nbrEmployes = data.nbrEmployes;
        this.nomPoste = data.nomPoste;
    }
}