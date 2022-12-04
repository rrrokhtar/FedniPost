import { Component, OnInit } from '@angular/core';
import { PostService } from './post.service';
import { Post } from "../post/post.interface";
import { onValue } from "firebase/database";


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {

  posts: Post[] = [];
  postsRef: any;
  constructor(private service: PostService) {
    this.postsRef = this.service.getPostsData();
    onValue(this.postsRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        let pIndex = this.posts.findIndex(p => p.id === childSnapshot.val().id);
        if (pIndex === -1) {
          this.posts.push(childSnapshot.val());
        } else {
          this.posts[pIndex] = childSnapshot.val();
        }
      });
    });
  }
  
  post: Post = {
    id: '',
    title: '',
    content: '',
    likes: 0,
    created_at: new Date().toLocaleString(),
    comments: [],
    temperory_comment: '',
  };

  save() {
    if (this.post.title === '' || this.post.content === '') {
      return;
    }
    this.post.id = `${this.posts.length + 1}`;
    this.posts.push(this.post);
    this.service.writePostData(this.post);
    this.cancel();
  }
  cancel() {
    this.post = {
      id: '',
      title: '',
      content: '',
      likes: 0,
      created_at: new Date().toLocaleString(),
      comments: [],
      temperory_comment: '',
    };
  }
  like(postId: string) {
    this.posts.filter(post => post.id === postId)[0].likes++;
    this.service.writePostData(this.posts.filter(post => post.id === postId)[0]);
  }
  dislike(postId: string) {
    this.posts.filter(post => post.id === postId)[0].likes--;
    this.service.writePostData(this.posts.filter(post => post.id === postId)[0]);
  }
  comment(postId: string) {
    let post = this.posts.filter(post => post.id === postId)[0];
    if (post.temperory_comment === '') {
      return;
    }
    if (post.comments === undefined) {
      post.comments = [];
    }
    post.comments.push({
      id: `${post.id}-${post.comments.length + 1}`,
      content: post.temperory_comment,
      created_at: new Date().toLocaleString(),
    });
    post.temperory_comment = '';
    this.service.writePostData(post);
  }
  trackByFn(index: any, item: any) {
    return item.id;
  }

}
