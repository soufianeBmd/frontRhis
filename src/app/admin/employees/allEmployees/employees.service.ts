import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from '../model/Employee.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'http://localhost:7000/employee';
  isTblLoading = true;
  dataChange: BehaviorSubject<Employee[]> = new BehaviorSubject<Employee[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData!: Employee;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Employee[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */

  getAllEmployeesFrom(): Observable<any>{
    return this.httpClient.get(`${this.API_URL}/all`);
  }

  getAllEmployeess(): void {
    this.subs.sink = this.httpClient.get<Employee[]>(`${this.API_URL}/all`).subscribe({
      next: (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data);
      },
      error: (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      },
    });
  }
  addEmployees(employees: Employee): void {
    this.dialogData = employees;

    this.httpClient.post(`${this.API_URL}/add`, employees)
       .subscribe({
         next: (data) => {
           this.dialogData = employees;
         },
         error: (error: HttpErrorResponse) => {
            // error code here
         },
       });
  }
  updateEmployees(employees: Employee): void {
    this.dialogData = employees;

     this.httpClient.put(`${this.API_URL}/update`, employees)
         .subscribe({
           next: (data) => {
             this.dialogData = employees;
           },
           error: (error: HttpErrorResponse) => {
               //error code here
           },
        });
  }
  deleteEmployees(id: number): void {
    console.log(id);

     this.httpClient.delete(`${this.API_URL}/delete/` + id)
         .subscribe({
           next: (data) => {
             console.log(id);
           },
           error: (error: HttpErrorResponse) => {
              // error code here
           },
         });
  }
}
