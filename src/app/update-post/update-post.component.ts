import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Posts } from '../models/posts';
import { updatePosts } from '../post/store/action/post.actions';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.scss']
})
export class UpdatePostComponent {

  public userId: number = 0;
  public title: string = '';
  public body: string = '';
  public id: number = 0;
  public errorMsg: string = '';

  constructor(private router: Router,
    private http: HttpClient, private store: Store) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      id: number,
      userId: number,
      title: string,
      body: string
    };
    this.userId = state['userId'];
    this.id = state['id'];
    this.body = state['body'];
    this.title = state['title'];
  }

  inputOnchange(event: any) {
    const name = event.target.name;
    if (name === 'title')
      this.title = event.target.value;
    else
      this.body = event.target.value;
    this.errorMsg = '';
  }

  onClickUpdate() {
    if (!this.body.trim() || !this.title.trim()) {
      this.errorMsg = "Field should not be empty";
    } else {
      const body = {
        id: this.id,
        title: this.title,
        body: this.body,
        userId: this.userId,
      };
      this.http.put(`https://jsonplaceholder.typicode.com/posts/${body.id}`, body).toPromise()
        .then(response => {
          const result = response as any;
          const post = new Posts();
          post.id = result.id; 
          post.userId = result.userId;
          post.body = result.body;
          post.title = result.title;
          this.store.dispatch(updatePosts(post));
          this.router.navigate(["/post-list"]);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

}
