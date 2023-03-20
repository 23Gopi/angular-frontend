import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPost from '../reducer/post.reducer';

export const selectPostState = createFeatureSelector<fromPost.PostState>(
    fromPost.postFeatureKey
);

export const selectPosts = createSelector(
    selectPostState,
    (state: fromPost.PostState) => state.posts
);