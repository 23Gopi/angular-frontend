import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Posts } from '../models/posts';
import { selectPosts } from '../post/store/selector/post.selectors';
import { addPosts } from '../post/store/action/post.actions';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
  public postLists: any[] = [];
  public page: number = 1;
  public pageSize: number = 10;
  public collectionSize: number = 0;
  public searchItem: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store
  ) {
    this.postLists = this.store.pipe(select(selectPosts)) as any;
  }

  ngOnInit() {
    this.getPosts();
  }

  async getPosts() {
    if (!this.postLists) {
      this.http.get('https://jsonplaceholder.typicode.com/posts').toPromise()
        .then(response => {
          this.postLists = response as any;
          this.postLists.map((postItem: any) => {
            const post = new Posts();
            post.id = postItem.id;
            post.userId = postItem.userId;
            post.body = postItem.body;
            post.title = postItem.title;
            this.store.dispatch(addPosts(post));
          });
          this.collectionSize = this.postLists.length;
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  async search(event: any): Promise<void> {
    if (event.target.value) {
      this.postLists = this.postLists.filter((val: any) => val.title.toLowerCase().includes(event.target.value));
      this.collectionSize = this.postLists.length as any;
    } else {
      await this.getPosts();
    }
  }

  clickNew(userId: number) {
    this.router.navigate(["/create-post"], {
      state: { id: userId },
    });
  }

  clickUpdate(data: any) {
    this.router.navigate(["/update-post"], {
      state: { id: data.id, userId: data.userId, body: data.body, title: data.title }
    })
  }

}
