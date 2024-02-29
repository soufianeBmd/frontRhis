import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { EmployeesService } from '../../employees.service';
import { UntypedFormControl, Validators, UntypedFormGroup, UntypedFormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Employee } from '../../../model/Employee.model';
import { formatDate } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { PostService } from 'app/admin/employees/services/post.service';
export interface DialogData {
  id: number;
  action: string;
  employees: Employee;
}
@Component({
    selector: 'app-form-dialog:not(c)',
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
        MatSelectModule,
        MatOptionModule,
    ],
})
export class FormDialogComponent implements OnInit{
  posts: any;
  action: string;
  dialogTitle: string;
  employeesForm: UntypedFormGroup;
  employees: Employee;
  
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public employeesService: EmployeesService,
    private fb: UntypedFormBuilder,
    private postService: PostService
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.employees.nom;
      this.employees = data.employees;
    } else {
      this.dialogTitle = 'New Employees';
      const blankObject = {} as Employee;
      this.employees = new Employee(blankObject);
    }
    this.employeesForm = this.createContactForm();
  }
  ngOnInit(): void {
    this.postService.getAllPostForm().subscribe((data)=>{
      this.posts = data;
    });
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
      id: [this.employees.id],
      nom: [this.employees.nom],
      prenom: [this.employees.prenom],
      sexe: [this.employees.sexe],
      post: [this.employees.post],
    });
  }
  submit() {
    // emppty stuff
    this.employeesService.addEmployees(this.employeesForm.value);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.employeesService.updateEmployees(this.employeesForm.getRawValue());
  }
}
