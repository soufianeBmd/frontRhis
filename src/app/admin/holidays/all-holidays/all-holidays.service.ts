import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AllHoliday } from './all-holidays.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';

@Injectable({
  providedIn: 'root',
})
export class HolidayService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'http://localhost:7000/contrat';
  isTblLoading = true;
  dataChange: BehaviorSubject<AllHoliday[]> = new BehaviorSubject<AllHoliday[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData!: AllHoliday;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): AllHoliday[] {
    //console.log(this.dataChange.value)
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllHolidays(): void {
    this.subs.sink = this.httpClient.get<AllHoliday[]>(`${this.API_URL}/all`).subscribe({
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
  addHoliday(holiday: AllHoliday): void {
    this.dialogData = holiday;
     this.httpClient.post(`${this.API_URL}/add`, holiday)
       .subscribe({
         next: (data) => {
           this.dialogData = holiday;
         },
         error: (error: HttpErrorResponse) => {
            // error code here
         },
       });
  }
  updateHoliday(holiday: AllHoliday): void {
    this.dialogData = holiday;
     this.httpClient.put(`${this.API_URL}/update`, holiday)
         .subscribe({
           next: (data) => {
             this.dialogData = holiday;
           },
           error: (error: HttpErrorResponse) => {
              // error code here
           },
         });
  }
  deleteHoliday(id: number): void {
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
