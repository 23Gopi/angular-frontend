import { createReducer, on } from '@ngrx/store';
import { Posts } from 'src/app/models/posts';
import * as PostActions from '../../../post/store/action/post.actions';

export const postFeatureKey = 'post';

export interface PostState {
  posts: Posts[]
}

export const initialState: PostState = {
  posts: []
};

export const reducer = createReducer(
  initialState,
  on(PostActions.addPosts, (state: PostState, { post }) => (
    {
      ...state,
      post: [...state.posts, post]
    }
  ))
);

