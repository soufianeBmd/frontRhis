import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  url : string = 'http://localhost:7000/employee';

  constructor(private http: HttpClient) { }

  addEmployee(employee: any): Observable<any>{
    return this.http.post(`${this.url}/add`, employee);
  }

}
