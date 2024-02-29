export class AnnualSalary{
    nom: string;
    salaireAnnuelle: number;

    public constructor(annualSalary: AnnualSalary){
        this.nom = annualSalary.nom;
        this.salaireAnnuelle = annualSalary.salaireAnnuelle;
    }
}