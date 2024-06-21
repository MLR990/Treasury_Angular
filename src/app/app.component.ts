import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Treasury_Angular';
  constructor(public authService: AuthService, private router: Router) {}

  onLogOutClicked() {
    this.authService.logout().subscribe({
      next: (response: string) => {
        this.authService.currentUserName = null;
        localStorage.removeItem('token');

        this.router.navigate(['/login']);
      },

      error: (error: any) => {
        console.log(error);
      },

      complete: () => {},
    });
  }
}
