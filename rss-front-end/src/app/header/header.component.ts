import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userAuthenticated = false;
  private authListenerSubs: Subscription;
  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userAuthenticated = isAuthenticated;
      });
  }

  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
  }
}
