export class ContratEmployee{
    nbEmployee: number;
    type: string;

    public constructor(contratEmployee: ContratEmployee){
        this.nbEmployee = contratEmployee.nbEmployee;
        this.type = contratEmployee.type;
    }
}