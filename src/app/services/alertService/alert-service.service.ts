import {Injectable} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {UserServiceService} from '../userService/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;
  private userService: UserServiceService;
  relevantRoom: string;

  constructor(private router: Router) {
    // clear alert message on route change
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          // only keep for a single location change
          this.keepAfterNavigationChange = false;
        } else {
          // clear alert
          this.subject.next();
        }
      }
    });
  }

  /**
   * Necessary because to deny cross dependency injection by angular
   * @param {UserServiceService} userService
   */
  public injectUserService(userService: UserServiceService) {
    this.userService = userService;
  }

  success(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({type: 'success', text: message});
  }

  error(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({type: 'error', text: message});
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  onAccept() {
    this.userService.joinRoom(this.relevantRoom);
  }

  /**
   * Receives event from user-service
   * @param {String} event
   * @param {string} room
   */
  public notifyUser(event: String, room: string) {
    this.relevantRoom = room;
    // todo display information
  }
}
