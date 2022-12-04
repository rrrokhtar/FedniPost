import { Component } from '@angular/core';
import { DBService } from '../services/db.service';
import { onValue } from "firebase/database";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  notificationsRef = this.service.getNotificationsData();
  notifications: Notification[] = [];
  constructor(private service: DBService) {
    this.service.getNotificationsData();
    onValue(this.notificationsRef, (snapshot) => {
      this.notifications = [];
      snapshot.forEach((childSnapshot) => {
        this.notifications.push(childSnapshot.val());
      });
    });
  }
  setNotificationsToRead() {
    this.notifications.forEach(notification => {
      this.service.setNotificationRead(notification.id);
    });
  }
  trackByFn(index: any, item: any) {
    return item.id;
  }
}
interface Notification {
  message: string;
  created_at: string;
  id: string;
  read: boolean;
}