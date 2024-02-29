import { formatDate } from '@angular/common';
import { Employee } from 'app/admin/employees/model/Employee.model';
export class AllHoliday {
  id: number;
  dateDebut: string;
  dateFin: string;
  type: string;
  employee: Employee
  constructor(holiday: AllHoliday) {
    {
      this.id = holiday.id;
      this.employee = holiday.employee;
      this.dateDebut = holiday.dateDebut;
      this.dateFin = holiday.dateFin;
      this.type = holiday.type;
    }
  }
}
