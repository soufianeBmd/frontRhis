import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FileUploadComponent } from '@shared/components/file-upload/file-upload.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { EmployeeService } from '../services/employee.service';
import { Post } from '../model/Post.model';
import { PostService } from '../services/post.service';
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
  standalone: true,
  imports: [
    BreadcrumbComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    FileUploadComponent,
    MatButtonModule,
  ],
})
export class AddEmployeeComponent implements OnInit{
  docForm: UntypedFormGroup;
  hide3 = true;
  agree3 = false;
  posts: any = [];
  constructor(private fb: UntypedFormBuilder, private service: EmployeeService, private postService: PostService) {
    this.docForm = this.fb.group({
      nom: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      prenom: [''],
      sexe: ['', [Validators.required]],
      post : ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.postService.getAllPost();
  }

  onSubmit() {
    this.service.addEmployee(this.docForm.value).subscribe((data)=>{
      console.log('Form Value', data);
    });
    //console.log('Form Value', this.docForm.value);
  }
}
