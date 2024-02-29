import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { HolidayService } from '../../all-holidays.service';
import { UntypedFormControl, Validators, UntypedFormGroup, UntypedFormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AllHoliday } from '../../all-holidays.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { EmployeesService } from 'app/admin/employees/allEmployees/employees.service';
import { MatSelect } from '@angular/material/select';

export interface DialogData {
  id: number;
  action: string;
  holiday: AllHoliday;
}
@Component({
    selector: 'app-form-dialog:not(d)',
    templateUrl: './form-dialog.component.html',
    styleUrls: ['./form-dialog.component.scss'],
    standalone: true,
    imports: [
        MatButtonModule,
        MatIconModule,
        MatDialogContent,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatDialogClose,
        MatOption,
        MatSelect
    ],
})
export class FormDialogComponent implements OnInit{
  employees: any;
  action: string;
  dialogTitle: string;
  holidayForm: UntypedFormGroup;
  holiday: AllHoliday;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public holidayService: HolidayService,
    private fb: UntypedFormBuilder,
    private employeeService: EmployeesService
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.holiday.type;
      this.holiday = data.holiday;
    } else {
      this.dialogTitle = 'New Contract';
      const blankObject = {} as AllHoliday;
      this.holiday = new AllHoliday(blankObject);
    }
    this.holidayForm = this.createContactForm();
  }
  ngOnInit(): void {
    this.employeeService.getAllEmployeesFrom().subscribe((data)=>{
      this.employees = data;
    })
  }
  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.holiday.id],
      dateDebut: [this.holiday.dateDebut],
      dateFin: [this.holiday.dateFin],
      type: [this.holiday.type],
      employee: [this.holiday.employee],
    });
  }
  submit() {
    this.holidayService.addHoliday(this.holidayForm.value);
    console.log(this.holidayForm.value);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.holidayService.addHoliday(this.holidayForm.getRawValue());
  }
}
