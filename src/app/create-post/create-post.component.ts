import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Posts } from '../models/posts';
import { addPosts } from '../post/store/action/post.actions';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {

  public userId: number = 0;
  public title: string = '';
  public body: string = '';
  public errorMsg: string = '';

  constructor(private router: Router,
    private http: HttpClient,
    private store: Store) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      id: number
    };
    this.userId = state['id'];
  }

  inputOnchange(event: any) {
    const name = event.target.name;
    if (name === 'title')
      this.title = event.target.value;
    else
      this.body = event.target.value;
    this.errorMsg = '';
  }

  onClickCreate() {
    if (!this.body.trim() || !this.title.trim()) {
      this.errorMsg = "Field should not be empty";
    } else {
      const body = {
        title: this.title,
        body: this.body,
        userId: this.userId,
      };
      this.http.post('https://jsonplaceholder.typicode.com/posts', body).toPromise()
        .then(response => {
          const result = response as any;
          const post = new Posts();
          post.id = result.id; 
          post.userId = result.userId;
          post.body = result.body;
          post.title = result.title;
          this.store.dispatch(addPosts(post));
          this.router.navigate(["/post-list"]);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
}
