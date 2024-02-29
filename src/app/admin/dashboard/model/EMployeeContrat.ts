export class EmployeeContrat{
    nom: string;
    type: string;
    date_d: Date;
    date_f: Date;
    jours: number;
    status: string;

    public constructor(employeeContrat: EmployeeContrat) {
        this.nom = employeeContrat.nom;
        this.type = employeeContrat.type;
        this.date_d = employeeContrat.date_d;
        this.date_f = employeeContrat.date_f;
        this.jours = employeeContrat.jours;
        this.status = employeeContrat.status;
    }
}