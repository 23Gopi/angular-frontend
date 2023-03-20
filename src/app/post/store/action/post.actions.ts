import { createAction, props } from '@ngrx/store';
import { Posts } from 'src/app/models/posts';

export const addPosts = createAction(
  '[Post] Add Posts', (post: Posts) => ({ post })
);

export const updatePosts = createAction(
  '[Post] Update Posts', (post: Posts) => ({ post })
);




