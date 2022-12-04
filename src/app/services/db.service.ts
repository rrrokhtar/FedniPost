import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, query, equalTo, orderByChild } from "firebase/database";

export const firebaseConfig = {
  // ...
  // The value of `databaseURL` depends on the location of the database
  databaseURL: "https://fednypost-default-rtdb.europe-west1.firebasedatabase.app",
};

import { Post } from "../post/post.interface";
@Injectable({
  providedIn: 'root'
})
export class DBService {
  app = initializeApp(firebaseConfig);
  database = getDatabase(this.app);
  constructor() { }
  writePostData(post: Post, action: string) {
    set(ref(this.database, 'posts/' + post.id), post);
    this.writeNotificationData({
      message: `${post.title} has got ${action}`,
      created_at: new Date().toLocaleString(),
      id: `${Math.floor(Math.random() * 1000000)}`,
      read: false,
    });
  }
  getPostData(postId: any) {
    return ref(this.database, 'posts/' + postId);
  }
  getPostsData() {
    return query(ref(this.database, 'posts/'), orderByChild('created_at'));
  }
  writeNotificationData(notification: any) {
    set(ref(this.database, 'notifications/' + notification.id), notification);
  }
  setNotificationRead(notificationId: any) {
    set(ref(this.database, 'notifications/' + notificationId + '/read'), true);
  }
  getNotificationData(notificationId: any) {
    return ref(this.database, 'notifications/' + notificationId);
  }
  getNotificationsData() {
    // Get the unread notifications
    return query(ref(this.database, 'notifications/'), orderByChild('read'), equalTo(false));
  }
}
