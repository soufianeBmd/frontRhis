import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeePost } from '../model/EmployeePost';
import { AnnualSalary } from '../model/AnnualSalary';
import { ContratEmployee } from '../model/ContratEmployee';
import { EmployeeContrat } from '../model/EMployeeContrat';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url: string = 'http://localhost:7000/dashboard';

  constructor(private http: HttpClient) { }

  getData():Observable<EmployeePost[]>{
    return this.http.get<EmployeePost[]>(`${this.url}/employee-par-post`);
  }

  getAnnualSalary(): Observable<AnnualSalary[]>{
    return this.http.get<AnnualSalary[]>(`${this.url}/salaire-annuelle`);
  }

  getNbEmployeeByContrat(annee: number): Observable<ContratEmployee[]>{
    return this.http.get<ContratEmployee[]>(`${this.url}/employee-contrat/${annee}`);
  }

  getContratDetails(): Observable<EmployeeContrat[]>{
    return this.http.get<EmployeeContrat[]>(`${this.url}/details`);
  }
}
