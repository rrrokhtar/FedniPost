import { Component } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { Post } from "../post/post.interface";
import { onValue } from "firebase/database";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  posts: Post[] = [];
  postsRef: any;
  constructor(private service: FirebaseService) {
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
  post :Post= {
    id: 0,
    title: '',
    content: '',
    likes: 0,
    created_at: new Date(),
    comments: []
  };
  
  save() {
    this.post.id = this.posts.length + 1;
    this.posts.push(this.post);
    this.service.writePostData(this.post);
    this.cancel();
  }
  cancel() {
    this.post = {
      id: 0,
      title: '',
      content: '',
      likes: 0,
      created_at: new Date(),
      comments: []
    };
  }
  like(postId: number) {
    this.posts.filter(post => post.id === postId)[0].likes++;
    this.service.writePostData(this.posts.filter(post => post.id === postId)[0]);
  }
  dislike(postId: number) {
    this.posts.filter(post => post.id === postId)[0].likes--;
    this.service.writePostData(this.posts.filter(post => post.id === postId)[0]);
  }
  comment(postId: number) {
    this.posts.filter(post => post.id === postId)[0].comments.push({
      id: this.posts.filter(post => post.id === postId)[0].comments.length + 1,
      content: "Comment",
      created_at: new Date()
    });
    this.service.writePostData(this.posts.filter(post => post.id === postId)[0]);
  }
  trackByFn(index: any, item: any) {
    return item.id;
  }
}
