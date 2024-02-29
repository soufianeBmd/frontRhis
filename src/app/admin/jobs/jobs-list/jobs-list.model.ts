import { formatDate } from '@angular/common';
export class JobsList {
  id: number;
  nom: string;
  salaire: number;
  constructor(jobsList: JobsList) {
    {
      this.id = jobsList.id;
      this.nom = jobsList.nom;
      this.salaire = jobsList.salaire;
    }
  }
}
