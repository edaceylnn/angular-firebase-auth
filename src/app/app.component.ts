import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  
  authService = inject(AuthService);
  router = inject(Router);

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.authService.currentUserLogin.set({
          email: user.email!,
        });
      } else {
        this.authService.currentUserLogin.set(null);
      }

      if (!this.authService.currentUserLogin()) {
        this.router.navigateByUrl('/login');
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }


  
}
