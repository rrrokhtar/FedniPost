import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
  // ...
  // The value of `databaseURL` depends on the location of the database
  databaseURL: "https://fednypost-default-rtdb.europe-west1.firebasedatabase.app",
};

import { Post } from "./post/post.interface";
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  app = initializeApp(firebaseConfig);
  database = getDatabase(this.app);
  constructor() { }
  writePostData(post: Post) {
    set(ref(this.database, 'posts/' + post.id), post);
  }
  getPostData(postId: any) {
    return ref(this.database, 'posts/' + postId);
  }
  getPostsData() {
    return ref(this.database, 'posts/');
  }
}
