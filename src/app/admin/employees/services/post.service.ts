import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post } from '../model/Post.model';
import { UnsubscribeOnDestroyAdapter } from '@shared';

@Injectable({
  providedIn: 'root'
})
export class PostService extends UnsubscribeOnDestroyAdapter {

  private readonly API_URL = 'http://localhost:7000/post';
  posts: any[] = []
  isTblLoading = true;
  dataChange: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData!: Post;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Post[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */

  getAllPostForm(): Observable<any>{
    return this.httpClient.get(`${this.API_URL}/all`);
  }

  getAllPost(): void {
    this.subs.sink = this.httpClient.get<Post[]>(`${this.API_URL}/all`).subscribe({
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
  addPost(post: Post): void {
    this.dialogData = post;

    this.httpClient.post(`${this.API_URL}/add`, post)
       .subscribe({
         next: (data) => {
           this.dialogData = post;
         },
         error: (error: HttpErrorResponse) => {
            // error code here
         },
       });
  }
  updatePost(post: Post): void {
    this.dialogData = post;

     this.httpClient.put(`${this.API_URL}/update`, post)
         .subscribe({
           next: (data) => {
             this.dialogData = post;
           },
           error: (error: HttpErrorResponse) => {
               //error code here
           },
        });
  }
  deletePost(id: number): void {
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
